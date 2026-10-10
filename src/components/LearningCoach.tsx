import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Copy, Check, ArrowUpRight } from "lucide-react";
import { LEARNING_PROMPTS } from "../data/learningData";
import { useToast } from "./Toast";
const goals = ["study", "exam", "debug", "project"];
export function LearningCoach() {
  const [params, setParams] = useSearchParams();
  const goal = goals.includes(params.get("goal") || "")
    ? params.get("goal")!
    : "study";
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [style, setStyle] = useState("Hints first");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  function generate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    const base = LEARNING_PROMPTS[goals.indexOf(goal)].promptText
      .replace(/\[TOPIC\]|\[SUBJECT\/TOPIC\]|\[PROJECT\]/g, () => topic.trim())
      .replace("[LEVEL]", level.toLowerCase());
    setResult(
      `${base}\n\nMy focus: ${topic.trim()}. Experience: ${level}. Preferred help style: ${style}.`,
    );
    setCopied(false);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      showToast("Your learning prompt is copied.");
    } catch {
      showToast("Select the prompt text and copy it manually.", "error");
    }
  }
  return (
    <section className="coach-panel" id="learning-coach">
      <div className="coach-intro">
        <span className="eyebrow">
          <Sparkles size={15} /> YOUR LEARNING COACH
        </span>
        <h2>
          A better prompt.
          <br />
          <em>A better starting point.</em>
        </h2>
        <p>
          Tell us what you’re working on. Take a tailored prompt to the AI tool
          you already use.
        </p>
        <span className="local-label">
          <span className="workspace-dot" /> Local prompt builder · No API key
          needed
        </span>
      </div>
      <div className="coach-form-area">
        <form onSubmit={generate}>
          <div className="coach-fields">
            <label>
              I want to
              <select
                value={goal}
                onChange={(e) => {
                  setParams(
                    { goal: e.target.value },
                    { preventScrollReset: true },
                  );
                  setResult("");
                }}
              >
                <option value="study">Understand a concept</option>
                <option value="exam">Prepare for an exam</option>
                <option value="debug">Debug code</option>
                <option value="project">Build a project</option>
              </select>
            </label>
            <label>
              My topic or project
              <input
                required
                maxLength={300}
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setResult("");
                }}
                placeholder="e.g. React hooks, linear algebra..."
              />
            </label>
            <label>
              Experience level
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  setResult("");
                }}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label>
              Help me with
              <select
                value={style}
                onChange={(e) => {
                  setStyle(e.target.value);
                  setResult("");
                }}
              >
                <option>Hints first</option>
                <option>Step-by-step explanation</option>
                <option>Questioning</option>
              </select>
            </label>
          </div>
          <button className="mint-button" type="submit">
            Create my prompt <ArrowUpRight size={16} />
          </button>
        </form>
        {result && (
          <div className="coach-result" aria-live="polite">
            <label htmlFor="generated-prompt">
              Your prompt · ready to make your own
            </label>
            <textarea
              id="generated-prompt"
              value={result}
              onChange={(e) => {
                setResult(e.target.value);
                setCopied(false);
              }}
            />
            <button className="quiet-button" onClick={copy}>
              {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
              {copied ? "Copied" : "Copy prompt"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
