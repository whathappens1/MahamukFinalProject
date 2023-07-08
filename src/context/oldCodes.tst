import React, { useContext } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import LoadingComp from "components/Loading";
import DataProvider from "../../context/DataContext";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

function ChangeEmail() {
  const { toggleTheme } = useContext(DataProvider);
  const { t, i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <>
        <Header />
        <LoadingComp />
        <Footer />
      </>
    );
  }

  if (user) {
    return (
      <>
        <div className={`App ${localStorage.getItem("theme")}`}>
          <Helmet>
            <title>
              {i18n.language === "ar"
                ? "مهامك - تغيير البريد الالكتروني"
                : "Mahamuk - Change Email"}
            </title>
            <meta name="description" content="تغيير البريد الالكتروني" />
          </Helmet>
          <Header />
          <main id="main" className="home">
            <section>
              <h1>hello</h1>
            </section>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default ChangeEmail;
