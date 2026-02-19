import { Link } from "react-router";

export default function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/animals">Animals</Link>
      </li>
      <li>
        <Link to="/requests">Requests</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
    </ul>
  );
}
