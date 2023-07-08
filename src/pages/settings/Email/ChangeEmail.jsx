/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import LoadingComp from "components/Loading";
import DataProvider from "../../../context/DataContext";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../../firebase/config";
import "../../styles/public.css";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import Model from "../../../components/Model";
import "../../../components/styles/loading.css";
import ForgotModel from "../../../components/models/ForgotModel";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";
import '../../../icomoon/style.css'
function ChangeEmail() {
  const { toggleTheme } = useContext(DataProvider);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);

  const [hasLoadingButton, setHasLoadingButton] = useState(false);
  const [hasLoadingButtonForgot, setHasLoadingButtonForgot] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [Emailsend, setEmailsend] = useState("");
  const [hasErrorForgot, sethasErrorForgot] = useState(false);
  const [passowrdForget, setPassowrdForget] = useState(false);
  const [firebaseErrorMsg, setFirebaseErrorMsg] = useState("");

  const [errorMsg, setErrorMsg] = useState(false);

  // to save password when change it inside a private ver!
  const [passwordValue, setPasswordValue] = useState("");
  const passwordChanged = (eo) => {
    setPasswordValue(eo.target.value);
  };

  // new email to replace it with old email
  const [newEmailValue, setNewEmailValue] = useState("");
  const newEmail = (eo) => {
    setNewEmailValue(eo.target.value);
  };

  // new email 2 && is match with new email 1
  const [newEmailValueCheck, setNewEmailValueCheck] = useState("");
  // const [isMatch, setIsMatch] = useState(false);

  const newEmailCheck = (eo) => {
    setNewEmailValueCheck(eo.target.value);
  };

  // to save everthing after check to database
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [matchErr, setMatchErr] = useState(false);

  const saveButton = (eo) => {
    eo.preventDefault();
    setHasLoadingButton(true);
    if (passwordValue === user.photoURL) {
      if (newEmailValue === newEmailValueCheck) {
        if (newEmailValue !== "" && newEmailValueCheck !== "") {
          updateDoc(doc(db, user.email, "user data"), {
            email: newEmailValue,
            email_verfiy: false,
          });
          updateEmail(auth.currentUser, newEmailValue)
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                // Email verification sent!
                // ...
                setPasswordErr(false);
                setEmailErr(false);
                setMatchErr(false);
                navigate("/");
                setHasLoadingButton(false);
                setErrorMsg(false);
              });
            })
            .catch((error) => {
              // An error occurred
              // ...
              setHasLoadingButton(false);
            });
        } else {
          setEmailErr(true);
          setPasswordErr(false);
          setMatchErr(false);
          setErrorMsg(true);
          setHasLoadingButton(false);
        }
      } else {
        setEmailErr(false);
        setPasswordErr(false);
        setMatchErr(true);
        setErrorMsg(true);
        setHasLoadingButton(false);
      }
    } else {
      setPasswordErr(true);
      setEmailErr(false);
      setMatchErr(false);
      setErrorMsg(true);
      setHasLoadingButton(false);
    }
    // else {
    //   setEmailErr(true);
    //   setPasswordErr(false);
    //   setErrorMsg(true);
    //   setHasLoadingButton(false);
    // }
  };

  // ========================
  //    Functions Of Model
  // ========================

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

  // when you want to close model
  const closeFunc = () => {
    setShowModal(false);
    sethasErrorForgot(false);
    setPassowrdForget(false);
    setHasLoadingButtonForgot(false);
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

  if (user) {
    if (i18n.language === "ar") {
      return (
        <>
          <div className={`App ${localStorage.getItem("theme")}`}>
            <Helmet>
              <title>مهامك - تغيير البريد الالكتروني</title>
              <meta name="description" content="تغيير البريد الالكتروني" />
            </Helmet>
            <Header />
            <main id="main" className="formMain">
              {showModal && (
                <ForgotModel
                  Model={Model}
                  closeFunc={closeFunc}
                  setEmailsend={setEmailsend}
                  resetpass={resetpass}
                  FirebaseErrorMsgForgot={firebaseErrorMsg}
                  hasLoadingButtonForgot={hasLoadingButtonForgot}
                  hasErrorForgot={hasErrorForgot}
                  passowrdForget={passowrdForget}
                />
              )}
              <section>
                <main id="main" className="formMain" dir="rtl">
                  <form>
                    <h1 className="SignH1">الإجراءات</h1>
                    <br />
                    <input
                      required
                      type="password"
                      placeholder="ادخل الرمز السري حاليا"
                      onChange={(eo) => {
                        passwordChanged(eo);
                      }}
                    />
                    <p className="account v2" style={{ textAlign: "right" }}>
                      هل نسيت كلمة المرور؟{" "}
                      <Link
                        to=""
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        {" "}
                        نعم نسيت{" "}
                      </Link>
                    </p>
                    <input
                      required
                      type="email"
                      placeholder="ادخل البريد الالكتروني الجديد"
                      onChange={(eo) => {
                        newEmail(eo);
                      }}
                    />
                    <input
                      required
                      type="email"
                      placeholder="تاكيد البريد الالكتروني الجديد"
                      onChange={(eo) => {
                        newEmailCheck(eo);
                      }}
                    />
                    <button
                      onClick={(eo) => {
                        saveButton(eo);
                      }}
                    >
                      {hasLoadingButton ? (
                        <div className="small"></div>
                      ) : (
                        "تغيير"
                      )}
                    </button>

                    {errorMsg && (
                      <>
                        {passwordErr && (
                          <p className="account bold">
                            كلمة السر غير صحيحة, حاول مرة اخرى بعدين
                          </p>
                        )}
                        {emailErr && (
                          <p className="account bold">
                            يوجد مشكلة في البريد الالكتروني
                          </p>
                        )}

                        {matchErr && (
                          <p className="account bold">
                            هناك مشكلة في البريد الالكتروني ليس متطابق مع اخوه
                          </p>
                        )}
                        <br />
                        <br />
                      </>
                    )}

                    <p className="account v3">
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                      الرجوع الى صفحة{" "}
                      <Link to="/YourAccount" style={{ marginRight: "5px" }}>
                        الإعدادات{" "}
                      </Link>
                    </p>
                  </form>
                  <br />
                  <br />
                </main>
              </section>
            </main>
            <Footer />
          </div>
        </>
      );
    }
    if (i18n.language === "en") {
      return (
        <>
          <div className={`App ${localStorage.getItem("theme")}`}>
            <Helmet>
              <title>Mahamuk - Change Email</title>
              <meta name="description" content="تغيير البريد الالكتروني" />
            </Helmet>
            <Header />
            <main id="main" className="formMain">
              {showModal && (
                <ForgotModel
                  Model={Model}
                  closeFunc={closeFunc}
                  setEmailsend={setEmailsend}
                  resetpass={resetpass}
                  FirebaseErrorMsgForgot={firebaseErrorMsg}
                  hasLoadingButtonForgot={hasLoadingButtonForgot}
                  hasErrorForgot={hasErrorForgot}
                  passowrdForget={passowrdForget}
                />
              )}
              <section>
                <main id="main" className="formMain" dir="ltr">
                  <form>
                    <h1 className="SignH1">Procedures</h1>
                    <br />
                    <input
                      required
                      type="password"
                      placeholder="Type your current password"
                      onChange={(eo) => {
                        passwordChanged(eo);
                      }}
                    />
                    <p className="account v2" style={{ textAlign: "left" }}>
                      Forgot Password?{" "}
                      <Link
                        onClick={() => {
                          setShowModal(true);
                        }}
                        to=""
                      >
                        Yes
                      </Link>
                    </p>
                    <input
                      required
                      type="email"
                      placeholder="Type your new email"
                      onChange={(eo) => {
                        newEmail(eo);
                      }}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Repeat your new email"
                      onChange={(eo) => {
                        newEmailCheck(eo);
                      }}
                    />
                    <button
                      onClick={(eo) => {
                        saveButton(eo);
                      }}
                    >
                      {hasLoadingButton ? (
                        <div className="small"></div>
                      ) : (
                        "Change"
                      )}
                    </button>

                    {errorMsg && (
                      <>
                        {passwordErr && (
                          <p className="account bold">
                            The password is incorrect, try again later
                          </p>
                        )}
                        {emailErr && (
                          <p className="account bold">
                            There is a problem with your email{" "}
                          </p>
                        )}

                        {matchErr && (
                          <p className="account bold">
                            There is a problem in the email is not identical to his brother
                          </p>
                        )}
                        <br />
                        <br />
                      </>
                    )}

                    <p className="account v3">
                      <Link to="/YourAccount" style={{ marginLeft: "5px" }}>
                        {" "}
                        Settings
                      </Link>
                      Go back to
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                    </p>
                  </form>
                  <br />
                  <br />
                </main>
              </section>
            </main>
            <Footer />
          </div>
        </>
      );
    }
  }
}

export default ChangeEmail;
