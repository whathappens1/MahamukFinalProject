/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  
  const [user] = useAuthState(auth);
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <div className="headerDiv">
        {/* header */}
        <header className="transparentHeader">
          {/* left items in header */}
          <Link to={"/"}>
            <div className="imgDiv">
              <img
                className="HeaderImg"
                src="../assets/imgs/BigTitleLogo.png"
                alt="logo"

              />
            </div>
          </Link>
          {/* navbars */}
          {/* normal if you with login*/}
          {user && (
            <div className="NavbarParent">
              <nav className="navbarHeader">
                <ul className="LinksUl">
                  <NavLink to="/" className="linkLi">
                    {/* الصفحة الرئيسية */}
                    <li>{t("home")}</li>

                  </NavLink>
                </ul>
              </nav>
            </div>
          )}
          {/* normal if you without login*/}
          {!user && (
            <div className="NavbarParent">
              <nav className="navbarHeader">
                <ul className="LinksUl">
                  <NavLink to="/SignIn" className="linkLi">
                    <li>
                    {i18n.language === "ar" && "تسجيل الدخول"}
                    {i18n.language === "en" && "Sign In"}
                    </li>

                  </NavLink>
                  <NavLink to="/SignUp" className="linkLi">
                  <li>
                    {i18n.language === "ar" && "تسجيل"}
                    {i18n.language === "en" && "Sign Up"}
                  </li>                  
                  </NavLink>
                </ul>
              </nav>
            </div>
          )}
          {/* mobile */}
          {showMobileNav && (
            <div className="NavbarParentMobile">
              <nav className="navbarHeaderMobile">
                {user && (
                  <ul className="LinksUlMobile">
                    <NavLink to="/" className="linkLiMobile">
                      <li>الصفحة الرئيسية</li>
                    </NavLink>
                  </ul>
                )}
                {!user && (
                  <ul className="LinksUlMobile">
                    <NavLink to="/SignIn" className="linkLiMobile">
                      <li>تسجيل الدخول</li>
                    </NavLink>
                    <NavLink to="/SignUp" className="linkLiMobile">
                      <li>تسجيل</li>
                    </NavLink>
                  </ul>
                )}
              </nav>
            </div>
          )}

          {/* other items inside navbar */}
          <div
            className="profileImg"
            onClick={() => {
              if (showMobileNav === false) {
                setShowMobileNav(true);
              } else {
                setShowMobileNav(false);
              }
            }}
          >
            <span className="icon-bars cogSpan" />
          </div>

          <NavLink
            className="humburger"
            to="/YourAccount"
            // onClick={() => {
            //   toggleTheme(
            //     localStorage.getItem("theme") == "light" ? "dark" : "light"
            //   );
            // }}
          >
            <span className="icon-cog humburgerSpan" />
          </NavLink>
        </header>
      </div>
      <br />
    </>
  );
}

export default Header;
