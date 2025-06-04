import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="span-container">
          <span className="copyright-span-1">
            © 2025 Made With
            <span className="fa-Heart">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            by
            <span className="wave-text">
              <span>K</span>
              <span>a</span>
              <span>m</span>
              <span>i</span>
              <span>l</span> <span>B</span>
              <span>a</span>
              <span>l</span>
              <span>d</span>
              <span>y</span>
              <span>g</span>
              <span>a</span>
            </span>
          </span>
        </div>

        <ul className="socials-ul">
          <li className="socials-li">
            <a
              href="https://www.linkedin.com/in/kamil-baldyga/"
              target="_blank">
              <FontAwesomeIcon icon={faLinkedin} className="fa-Linkedin" />
            </a>
            <a href="https://www.github.com/ME0WGE" target="_blank">
              <FontAwesomeIcon icon={faGithub} className="fa-Github" />
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
