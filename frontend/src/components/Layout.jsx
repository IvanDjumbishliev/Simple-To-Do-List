import "../styles/Layout.css";
import { Link } from 'react-router-dom';
import { Outlet } from "react-router";
import { FaInstagram, FaDiscord, FaFacebook } from 'react-icons/fa';

export default function Layout() {
  return (
    <div className="fade-in">
      <header className="header">
        <nav className="nav-container">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
          <div>
            <Link className="btn-nav btn-primary" to="/register">
              Register
            </Link>
          </div>
        </nav>
      </header>
      <Outlet />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Organize your daily tasks with this Simple to-do APP👌</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-btn">Home</Link>
              <Link to="/tasks" className="footer-btn">Tasks</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                <FaDiscord className="social-icon" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Ivan Dzhumbishliev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
