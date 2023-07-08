/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "./error";
import LoadingComp from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { signOut, deleteUser } from "firebase/auth";
import Moment from "react-moment";
import DataProvider from "../context/DataContext";
// import './styles/settings.css';
import { useTranslation } from "react-i18next";
import SettingsMain from "../components/settingsMain";

function settings() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useContext(DataProvider);
  const { toggleTheme } = useContext(DataProvider);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  // const [value, loadinG, erroR] = useDocument(doc(db, user.email));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });

  // when i click on "delete" button
  const deleteBtn = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  // when i click on "signout" button
  const signoutBtn = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // dark mode & light mode select
  const mode = (eo) => {
    // if (eo.target.value == "light") {
    //   toggleTheme(localStorage.getItem("theme") == "light" ? "dark" : "light");
    // } else {
    //   toggleTheme(localStorage.getItem("theme") == "dark" ? "light" : "dark");
    // }
    toggleTheme(localStorage.getItem("theme") === "light" ? "dark" : "light");
  };

  // change your lang to other
  const langs = (eo) => {
    // if (eo.target.value == "ar") {
    //   i18n.changeLanguage("ar");
    // } else if (eo.target.value == "en") {
    //   i18n.changeLanguage("en");
    // }

    i18n.language === "en"
      ? i18n.changeLanguage("ar")
      : i18n.changeLanguage("en");
  };

  if (loading) {
    return (
      <>
        <Header />
        <LoadingComp />
        <Footer />
      </>
    );
  }

  if (error) {
    <Error />;
  }

  if (user) {
    const dataCreate = (
      <Moment fromNow from={user.metadata.creationTime}></Moment>
    );

    return (
      <>
        <div className={`App ${localStorage.getItem("theme")}`}>
          <Helmet>
            <title>
              {i18n.language === "ar"
                ? "مهامك - الإعدادات"
                : "Mahamuk - Settings"}
            </title>
            {/* <link rel="stylesheet" href="./styles/settings.css" /> */}
            <meta name="description" content="الإعدادات" />
          </Helmet>
          <Header />
          {user && (
            <SettingsMain
              i18n={i18n}
              // @ts-ignore
              dataCreate={dataCreate}
              langs={langs}
              mode={mode}
              deleteBtn={deleteBtn}
              signoutBtn={signoutBtn}
              auth={auth}
              db={db}
            />
          )}
          <Footer />
        </div>
      </>
    );
  }
}

export default settings;
