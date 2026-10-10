import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="workspace-footer">
      <span>© {new Date().getFullYear()} Motivation Code</span>
      <span>More capable. Less dependent.</span>
      <Link to="/about">Made for curious minds ↗</Link>
    </footer>
  );
}
