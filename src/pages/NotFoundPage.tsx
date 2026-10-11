import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="workspace-home">
    <p className="eyebrow">404 · PAGE NOT FOUND</p>
    <h1>This page has moved—or doesn’t exist.</h1>
    <p>Head back to your workspace or browse the reel library.</p>
    <p><Link to="/">Back to overview</Link> · <Link to="/reels">Browse reels</Link></p>
  </section>;
}
