import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

function Footer() {
  return (
    <>
      <div className="footer-basic">
        <footer  style={{bottom: "-140px"}}>
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/">Home</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/YourAccount">Settings</Link>
            </li>
          </ul>
          <hr style={{width: "65%"}} />
          <div className="sIcons_parent">
            <a href="https://twitter.com/whathappens_1" target="_blank" rel="noreferrer"><span className="icon-twitter sIcons"></span></a>
            <a href="https://github.com/SmithsKSA" target="_blank" rel="noreferrer"><span className="icon-github sIcons"></span></a> 
            {/* <a href="https://www.youtube.com/@whathappens1" target="_blank"><span className="icon-youtube sIcons"></span></a>  */}
            {/* <a href="https://khamsat.com/user/tameemsahli" target="_blank"><span className="icon-link sIcons"></span></a>  */}
            <Link to="/Discord">
              <span className="icon-discord sIcons"></span>
            </Link>

              <br />
          </div>
          <p className="copyright" 
// @ts-ignore
          sx={{marginTop: "13px"}}>جميع الحقوق محفوظة © {new Date().getFullYear()} لشيخ تميم السهلي</p>
        </footer>
      </div>
      <br />
      <br />
    </>
  );
}

export default Footer;
