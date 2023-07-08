/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "./error";
import LoadingComp from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataProvider from "../context/DataContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

function signup() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useContext(DataProvider);
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [FirebaseErrorMsg, setFirebaseErrorMsg] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [hasLoadingButton, setHasLoadingButton] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (user) {
      if ((user.emailVerified, !user.emailVerified)) {
        navigate("/");
      }
    }
  });

  // when you click on "SignUp" button
  const signUpBtn = (eo) => {
    eo.preventDefault();
    setHasLoadingButton(true);
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: UserName,
          photoURL: Password,
        })
          .then(async () => {
            sendEmailVerification(auth.currentUser).then(() => {
              // done
            });
            await setDoc(doc(db, user.email, `user data`), {
              email: user.email,
              userName: user.displayName,
              user_UID: user.uid,
              password: Password,
              email_verfiy: user.emailVerified,
            });
            // done
            setHasLoadingButton(false);
          })
          .catch((error) => {
            console.log(error.code);
          });
        // ...
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

  if (error) {
    <Error />;
  }

  if (loading) {
    return <LoadingComp />;
  }

  if (!user) {
    if (i18n.language === "ar") {
      return (
        <>
          <div className={`App ${localStorage.getItem("theme")}`}>
            <Helmet>
              <title>مهامك - تسجيل حساب</title>
              <meta name="description" content="تسجيل حساب" />
            </Helmet>
            <Header />
            <main
              id="main"
              className="formMain"
              style={{ marginBottom: "-43px" }}
            >
              <form>
                <h1 className="SignH1">تسجيل حساب</h1>
                <br />
                <input
                  onChange={(eo) => {
                    setUserName(eo.target.value);
                  }}
                  required
                  type="name"
                  placeholder="ادخل الاسم الكريم"
                />
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
                    signUpBtn(eo);
                  }}
                >
                  {hasLoadingButton ? (
                    <div className="small"></div>
                  ) : (
                    "تسجيل حساب"
                  )}
                </button>
                {hasError && <p className="errorMsg">{FirebaseErrorMsg}</p>}
                <p className="account" style={{ marginBottom: "7px" }}>
                  لديك بالفعل حساب قم بـ<Link to="/SignIn">تسجيل الدخول</Link>
                </p>
              </form>
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
              <title>Mahamuk - Sign Up</title>
              <meta name="description" content="تسجيل حساب" />
            </Helmet>
            <Header />
            <main
              id="main"
              className="formMain"
              style={{ marginBottom: "-43px" }}
            >
              <form>
                <h1 className="SignH1">Sign Up</h1>
                <br />
                <input
                  onChange={(eo) => {
                    setUserName(eo.target.value);
                  }}
                  required
                  type="name"
                  placeholder="Type your name"
                />
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
                    signUpBtn(eo);
                  }}
                >
                  {hasLoadingButton ? <div className="small"></div> : "Sign Up"}
                </button>
                {hasError && <p className="errorMsg">{FirebaseErrorMsg}</p>}
                <p className="account" style={{ marginBottom: "7px" }}>
                  Already have an account? <Link to="/SignIn">Sign Up</Link>
                </p>
              </form>
            </main>
            <Footer />
          </div>
        </>
      );
    }
  }
}

export default signup;
