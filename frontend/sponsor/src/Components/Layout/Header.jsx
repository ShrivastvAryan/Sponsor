import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="section-navbar">
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="index.html">SPONSOR</NavLink>
          </div>

          <nav className="navbar">
            <ul>
              <li className="nav-item">
                <NavLink to="/">home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  about
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/explore" className="nav-link">
                  explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
