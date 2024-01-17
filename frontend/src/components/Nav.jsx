import React, { useEffect, useState } from "react";
import "../styles/Nav.css";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();

  const [isAuthenticated, setAuthenticated] = useState(Boolean);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setAuthenticated(Boolean(token));
  }, [isAuthenticated, token]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigateTo("/login");
  };

  return (
    <nav>
      <div className="logo">E-Learning</div>

      <div className={`menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {!isAuthenticated && (
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          <li>
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li onClick={logout}>
              <Link className="nav-link">Logout</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="hamburger" onClick={toggleNavbar}>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Nav;
