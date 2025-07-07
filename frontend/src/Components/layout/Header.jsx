import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { id: "/", label: "Home" },
    { id: "/about", label: "About" },
    { id: "/connect", label: "Connect" },
    { id: "/Team", label: "Team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50  backdrop-blur-xl  ${
        isScrolled
          ? "bg-black/20 backdrop-blur-lg border-b border-white/10"
          : ""
      }`}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-48 h-auto">
              <img
                src="/Click2sponsor.png" // ✅ No `/public` in path!
                alt="Click2Sponsor Logo"
                className="w-full h-auto object-contain"
              />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center pt-1 space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.id}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 font-medium group ${
                    isActive ? "text-white" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    ></div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center border border-white/20 hover:border-white/30"
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute top-0 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`absolute top-2 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`absolute top-4 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <nav className="py-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.id}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-4 right-1/3 w-1 h-1 bg-purple-300/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-6 left-2/3 w-1 h-1 bg-pink-300/40 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </header>
  );
};
