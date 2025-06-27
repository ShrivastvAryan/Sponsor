import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <>
      <footer className="section-footer">
        <div className="footer-container container">
          <div className="content_1">
            <img src="./images/logo.png" alt="logo" />
            <p>site description / moto</p>
          </div>
          <div className="content_2">
            <h4>NAVIGATION</h4>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Explore</a>
            <a href="#">Sales & Discount</a>
          </div>
          <div className="content_3">
            <h4>Resource</h4>
            <a href="./contact.html">FAQ</a>
          </div>
          <div className="content_4">
            <h4>Contact Us</h4>
            <p>datasmithss@gmail.com</p>
          </div>
        </div>
        <div className="f-design">
          <div className="social-container">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon" />
            </a>
          </div>
          <div className="f-design-txt">
            <p>&copy; 2025 Site Name. All rights reserved.</p>
            <p>Made with ❤️ by the Data Smiths</p>
          </div>
        </div>
      </footer>
    </>
  );
};
