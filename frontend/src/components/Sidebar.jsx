import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Typing tester</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/wpm">Check your wpm</Link></li>
        <li><Link to="/practice">Practice</Link></li>
      </ul>
    </div>
  );
}
