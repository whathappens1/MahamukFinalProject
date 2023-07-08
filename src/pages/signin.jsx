/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Model from "../components/Model";
import Error from "./error";
import LoadingComp from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import DataProvider from "../context/DataContext";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useTranslation } from "react-i18next";
import "../components/styles/loading.css";
import ForgotModel from "components/models/ForgotModel";

function signin() {
  const { theme } = useContext(DataProvider);
  const { t, i18n } = useTranslation();

  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [FirebaseErrorMsg, setFirebaseErrorMsg] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [passowrdForget, setPassowrdForget] = useState(false);
  const [Emailsend, setEmailsend] = useState("");
  const [hasErrorForgot, sethasErrorForgot] = useState(false);
  const [FirebaseErrorMsgForgot, setFirebaseErrorMsgForgot] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasLoadingButton, setHasLoadingButton] = useState(false);
  const [hasLoadingButtonForgot, setHasLoadingButtonForgot] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }

      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  // when you click on "reset password" button
  const resetpass = (eo) => {
    eo.preventDefault();
    setHasLoadingButtonForgot(true);
    sendPasswordResetEmail(auth, Emailsend)
      .then(() => {
        setPassowrdForget(true);
        setHasLoadingButtonForgot(false);
        sethasErrorForgot(false);

        // ..
      })
      .catch((error) => {
        setHasLoadingButtonForgot(false);
        setPassowrdForget(false);

        const errorCode = error.code;
        sethasErrorForgot(true);

        switch (errorCode) {
          case "auth/email-already-exists":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "البريد الإلكتروني بالفعل مستخدم" : "The email is already in use"
            );
            break;

          case "auth/email-already-in-use":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "البريد الإلكتروني بالفعل مستخدم" : "The email is already in use"
            );
            break;

          case "auth/invalid-email":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "البريد غير صالح" : "invalid email"
            );
            break;

          case "auth/invalid-password":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "كلمة مرور غير صالحة" : "invalid password"
            );
            break;

          case "auth/wrong-password":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "كلمة مرور غير صحيحة" : "incorrect password"
            );
            break;

          case "auth/user-not-found":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "حسابك غير متوفر" : "Your account is not available"
            );
            break;

          case "auth/internal-error":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "تاكد من وضع كلمة مرور او بريد الاكتروني" : "Make sure to put a password or email."
            );
            break;

          case "auth/weak-password":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "كلمة مرور قصيرة جدا" : "Password too short"
            );
            break;

          case "auth/missing-email":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "يجب عليك وضع بريد الاكتروني" : "You must enter an email."
            );
            break;

          case "auth/too-many-requests":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "انت تفعل اشياء كثيرة الرجاء حاول لاحقا نحن على الحديدة" : "You're doing too many things. Please try again later. We're sorry."
            );

            break;

          case "auth/network-request-failed":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "انت غير متصل بـ الإنترنت" : "You are not connected to the Internet"
            );
            break;

          case "auth/user-disabled":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "حسابك بالع باند للاسف ): بس تقدر تسوي واحد جديد" : "Your account is currently suspended, but you can create another one (:"
            );
            break;

          case "auth/operation-not-allowed":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "لا يمكنك تسجيل في هذا الوقت الحالي" : "You cannot register or log in at this time."
            );
            break;

          default:
            // setFirebaseErrorMsg("خطا ما في البريد الالكتروني او في كلمة المرور");
            setFirebaseErrorMsg(errorCode);

            break;
        }
      });
  };

  // when you click "signIn" button
  const signInBtn = (eo) => {
    eo.preventDefault();
    setHasLoadingButton(true);
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // ...
        setHasLoadingButton(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true);
        setHasLoadingButton(false);

        switch (errorCode) {
          case "auth/email-already-exists":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "البريد الإلكتروني بالفعل مستخدم" : "The email is already in use"
            );
            break;

          case "auth/email-already-in-use":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "البريد الإلكتروني بالفعل مستخدم" : "The email is already in use"
            );
            break;

          case "auth/invalid-email":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "البريد غير صالح" : "invalid email"
            );
            break;

          case "auth/invalid-password":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "كلمة مرور غير صالحة" : "invalid password"
            );
            break;

          case "auth/wrong-password":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "كلمة مرور غير صحيحة" : "incorrect password"
            );
            break;

          case "auth/user-not-found":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "حسابك غير متوفر" : "Your account is not available"
            );
            break;

          case "auth/internal-error":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "تاكد من وضع كلمة مرور او بريد الاكتروني" : "Make sure to put a password or email."
            );
            break;

          case "auth/weak-password":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "كلمة مرور قصيرة جدا" : "Password too short"
            );
            break;

          case "auth/missing-email":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "يجب عليك وضع بريد الاكتروني" : "You must enter an email."
            );
            break;

          case "auth/too-many-requests":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "انت تفعل اشياء كثيرة الرجاء حاول لاحقا نحن على الحديدة" : "You're doing too many things. Please try again later. We're sorry."
            );

            break;

          case "auth/network-request-failed":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "انت غير متصل بـ الإنترنت" : "You are not connected to the Internet"
            );
            break;

          case "auth/user-disabled":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "حسابك بالع باند للاسف ): بس تقدر تسوي واحد جديد" : "Your account is currently suspended, but you can create another one (:"
            );
            break;

          case "auth/operation-not-allowed":
            setFirebaseErrorMsg(
              i18n.language === "ar" ? "لا يمكنك تسجيل في هذا الوقت الحالي" : "You cannot register or log in at this time."
            );
            break;

          default:
            // setFirebaseErrorMsg("خطا ما في البريد الالكتروني او في كلمة المرور");
            setFirebaseErrorMsg(errorCode);

            break;
        }
      });
  };

  // when you want to close model
  const closeFunc = () => {
    setShowModal(false);
    sethasErrorForgot(false);
    setPassowrdForget(false);
    setHasLoadingButtonForgot(false);
  };

  if (loading) {
    return <LoadingComp />;
  }

  if (error) {
    <Error />;
  }

  if (i18n.language === "ar") {
    return (
      <>
        <div className={`App ${localStorage.getItem("theme")}`}>
          <Helmet>
            <title>مهامك - تسجيل الدخول</title>
            <meta name="description" content="تسجيل الدخول" />
          </Helmet>
          <Header />
          <main id="main" className="formMain">
            {showModal && (
              <ForgotModel
              Model={Model}
              closeFunc={closeFunc}
              setEmailsend={setEmailsend}
              resetpass={resetpass}
              FirebaseErrorMsgForgot={FirebaseErrorMsgForgot}
              hasLoadingButtonForgot={hasLoadingButtonForgot}
              hasErrorForgot={hasErrorForgot}
              passowrdForget={passowrdForget}
            />
            )}

            <form>
              <h1 className="SignH1">تسجيل الدخول</h1>
              <br />
              <input
                onChange={(eo) => {
                  setEmail(eo.target.value);
                }}
                required
                type="email"
                placeholder="ادخل البريد الالكتروني"
              />
              <input
                onChange={(eo) => {
                  setPassword(eo.target.value);
                }}
                required
                type="password"
                placeholder="ادخل الرمز السري"
              />

              <button
                onClick={(eo) => {
                  signInBtn(eo);
                }}
              >
                {hasLoadingButton ? (
                  <div className="small"></div>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
              {hasError && <p className="errorMsg">{FirebaseErrorMsg}</p>}
              <p className="account">
                هل نسيت كلمة المرور؟{" "}
                <Link
                  onClick={() => {
                    setShowModal(true);
                  }}
                  // style={{ textDecoration: "underline", cursor: "pointer"}}
                  to=""
                >
                  {" "}
                  نعم نسيت{" "}
                </Link>
              </p>
              <br />
              <br />

              <p className="account">
                اذا لديك حساب <Link to="/SignUp">تسجيل حساب</Link>
              </p>
            </form>
            <br />
            <br />
          </main>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`App ${localStorage.getItem("theme")}`}>
          <Helmet>
            <title>Mahamuk - Sign In</title>
            <meta name="description" content="تسجيل الدخول" />
          </Helmet>
          <Header />
          <main id="main" className="formMain">
            {showModal && (
              <ForgotModel
                Model={Model}
                closeFunc={closeFunc}
                setEmailsend={setEmailsend}
                resetpass={resetpass}
                FirebaseErrorMsgForgot={FirebaseErrorMsgForgot}
                hasLoadingButtonForgot={hasLoadingButtonForgot}
                hasErrorForgot={hasErrorForgot}
                passowrdForget={passowrdForget}
              />
            )}

            <form>
              <h1 className="SignH1">Sign In</h1>
              <br />
              <input
                onChange={(eo) => {
                  setEmail(eo.target.value);
                }}
                required
                type="email"
                placeholder="Type your email"
              />
              <input
                onChange={(eo) => {
                  setPassword(eo.target.value);
                }}
                required
                type="password"
                placeholder="Type your password"
              />

              <button
                onClick={(eo) => {
                  signInBtn(eo);
                }}
              >
                {hasLoadingButton ? <div className="small"></div> : "Sign In"}
              </button>
              {hasError && <p className="errorMsg">{FirebaseErrorMsg}</p>}
              <p className="account" dir="auto">
                Forgot Password?{" "}
                <Link
                  onClick={() => {
                    setShowModal(true);
                  }}
                  // style={{ textDecoration: "underline", cursor: "pointer"}}
                  to=""
                >
                  Yes
                </Link>
              </p>
              <br />
              <br />

              <p className="account" dir="auto">
                If you have an account <Link to="/SignUp">Sign Up</Link>
              </p>
            </form>
            <br />
            <br />
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default signin;
