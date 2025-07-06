import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="section-navbar">
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className="brand-link">
              <span className="brand-text">SPONSOR</span>
              <div className="brand-glow"></div>
            </NavLink>
          </div>

          <nav className="navbar">
            <ul>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <span>home</span>
                  <div className="nav-indicator"></div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  <span>about</span>
                  <div className="nav-indicator"></div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/explore" className="nav-link">
                  <span>explore</span>
                  <div className="nav-indicator"></div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  <span>contact</span>
                  <div className="nav-indicator"></div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
