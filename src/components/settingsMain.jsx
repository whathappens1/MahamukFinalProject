/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingComp from "./Loading";
import { Link } from "react-router-dom";

function SettingsMain({
  i18n,
  langs,
  mode,
  deleteBtn,
  signoutBtn,
  auth,
  db
}) {
  const [user] = useAuthState(auth);

  const [value, loading] = useDocument(doc(db, user.email, "user data"));
  const passwordTxt = user.photoURL.replace(/[a-zA-Z0-9,\\.\\_]/g, "*");


  if (loading) {
    return (
      <>
        <LoadingComp />
      </>
    );
  }

  if (value) {

  // const usernameTxt = value.data().userName;

    return (
      <main id="main" className="formMain" style={{ marginTop: "35px" }}>
        <form
          onClick={(eo) => {
            eo.preventDefault();
          }}
        >
          <h1 className="SignH1 settingsh1">
            {i18n.language === "ar" ? "المعلومات" : "Information"}
          </h1>
          <br />
          <article>
            {i18n.language === "ar" && (
              <div className="settingsDiv" dir="auto">
                <p className="dn">العربية</p>
                <h2>{user.email}</h2>
                <Link to="/YourAccount/Change_Email">
                  <h2 className="SettingsLinksH2">تغيير البريد الالكتروني</h2>
                </Link>
                <hr />
                <h2>حياك الله: {user.displayName}</h2>
                <Link to="/YourAccount/Change_UserName">
                  <h2 className="SettingsLinksH2">تغيير الاسم الكريم</h2>
                </Link>
                <hr />

                <h2>كلمة السر: {passwordTxt}</h2>
                <Link to="/YourAccount/Change_Password">
                  <h2 className="SettingsLinksH2">تغيير كلمة السر</h2>
                </Link>
                {/* <hr /> */}
                {/* <h2>تاريخ الانشاء: {dataCreate}</h2> */}
                <br />
              </div>
            )}
            {i18n.language === "en" && (
              <div className="settingsDiv" dir="auto">
                <p className="dn">English</p>
                <h2>{user.email}</h2>
                <Link to="/YourAccount/Change_Email">
                  <h2 className="SettingsLinksH2">Change Email</h2>
                </Link>
                <hr />
                <h2>Welcome: {user.displayName}</h2>
                <Link to="/YourAccount/Change_UserName">
                  <h2 className="SettingsLinksH2">Change UserName</h2>
                </Link>
                <hr />
                <h2>Password: {passwordTxt}</h2>
                <Link to="/YourAccount/Change_Password">
                  <h2 className="SettingsLinksH2">Change Password</h2>
                </Link>
                {/* <hr />
                <h2>Creation Time: {dataCreate}</h2> */}
                <br />
              </div>
            )}
          </article>
        </form>
        <br />
        <form
          onClick={(eo) => {
            eo.preventDefault();
          }}
        >
          <h1 className="SignH1 settingsh1">
            {i18n.language === "ar" ? "الخيارات" : "Options"}
          </h1>
          <article>
            <hr />
          </article>
          <br />
          <h2 className="selectorsP" dir="auto">
            {i18n.language === "ar" ? "اللغات" : "Languages"}
          </h2>
          <button
            className="signMethodBtn"
            onClick={() => {
              langs();
            }}
          >
            {i18n.language === "ar" ? "تغير اللعة" : "Change Language"}
          </button>
          <br />
          <h2 className="selectorsP" dir="auto">
            {i18n.language === "ar" ? "الوضع" : "Mode"}
          </h2>
          <button
            className="signMethodBtn"
            onClick={() => {
              mode();
            }}
          >
            {i18n.language === "ar" ? "تغير اللون" : "Change Theme"}
          </button>
          <br />
          <br />
          <br />
          <button
            className="signMethodBtn"
            onClick={() => {
              deleteBtn();
            }}
          >
            {i18n.language === "ar" ? "حذف الحساب" : "Delete account"}
          </button>
          <br />
          <button
            className="signMethodBtn"
            onClick={() => {
              signoutBtn();
            }}
          >
            {i18n.language === "ar" ? "تسجيل الخروج" : "Sign Out"}
          </button>
          <br />
          <br />
          <br />
          <article>
            <hr />
          </article>
        </form>
      </main>
    );
  }
}

export default SettingsMain;
