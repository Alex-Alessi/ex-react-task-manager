import { NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className="nav-link">
            Lista Task
          </NavLink>
        </li>
        <li className="nav-link">-</li>
        <li>
          <NavLink to="/add" className="nav-link">
            Aggiungi Task
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
