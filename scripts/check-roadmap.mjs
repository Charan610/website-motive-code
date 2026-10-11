import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const dir = mkdtempSync(join(tmpdir(), 'mc-roadmap-'));
try {
  execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', 'src/lib/roadmapEngine.ts', 'src/lib/roadmapStorage.ts', '--outDir', dir, '--module', 'commonjs', '--target', 'es2023', '--skipLibCheck', '--ignoreConfig'], { stdio: 'pipe' });
  const require = createRequire(import.meta.url);
  const engine = require(join(dir, 'lib/roadmapEngine.js'));
  const storage = require(join(dir, 'lib/roadmapStorage.js'));
  const { BRANCH_REGISTRY } = require(join(dir, 'data/roadmapData.js'));
  const data = new Map();
  globalThis.window = { dispatchEvent() {} };
  globalThis.localStorage = { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,v), removeItem: k => data.delete(k) };
  const base = { id:'test-plan', displayName:'test_student', recoveryKey:'MC-1234-5678-ABCD', branch:'CSE', regulation:'R23', year:1, semester:1, goal:'placements', weeklyAvailability:'standard', primaryObstacle:'fundamentals', diagnosticAnswers:{}, completedActionIds:[], createdAt:'2026-10-11', lastUpdated:'2026-10-11' };
  let count=0;
  for (const branch of BRANCH_REGISTRY.filter(b => b.isSupported)) for (const year of [1,2,3,4]) {
    const questions=engine.getDiagnosticQuestions(branch.code,year);
    assert.ok(questions.length>0); assert.ok(questions.every(q=>q.minYear<=year));
    const profile={...base,branch:branch.code,year,semester:year*2-1,diagnosticAnswers:Object.fromEntries(questions.map(q=>[q.id,q.correctIndex]))};
    const plan=engine.generateRoadmapPlan(profile);
    assert.equal(plan.diagnosticScore.correct,questions.length);
    assert.equal(plan.recoveryBridge,null);
    assert.ok(plan.nextActions.length>0,`${branch.code} year ${year} needs actions`);
    assert.equal(storage.isStudentProfile(profile),true); count++;
  }
  assert.equal(storage.saveStudentProfile(base),true);
  assert.equal(storage.getSavedStudentProfile().id,base.id);
  storage.clearSavedPlan(); assert.equal(storage.getSavedStudentProfile(),null);
  assert.equal(storage.restorePlanByKeyOrId(base.recoveryKey.toLowerCase()).id,base.id);
  for(const invalid of [null,[],{}, {...base,year:1,semester:7},{...base,diagnosticAnswers:null}]) {
    data.set('mc_roadmap_profile_v1',JSON.stringify(invalid)); assert.equal(storage.getSavedStudentProfile(),null);
  }
  data.set('mc_roadmap_registry_v1','{"bad":null}'); assert.equal(storage.restorePlanByKeyOrId('unknown'),null);
  assert.equal(storage.checkUsernameAvailable('new_name').available,true);
  data.set('mc_roadmap_profile_v1','{bad'); assert.equal(storage.getSavedStudentProfile(),null);
  globalThis.localStorage.setItem=()=>{throw new Error('Storage blocked');};
  assert.equal(storage.saveStudentProfile(base),false);
  assert.ok(!storage.exportPlanAsMarkdown(base,[]).includes('on any browser'));
  console.log(`Passed: ${count} supported branch/year plans, diagnostic scoring, storage validation, recovery, and blocked-storage handling.`);
} finally { rmSync(dir,{recursive:true,force:true}); }
