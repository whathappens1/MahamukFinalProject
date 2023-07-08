import React from "react";
import { useTranslation } from "react-i18next";

function ForgotModel({
  Model,
  closeFunc,
  setEmailsend,
  resetpass,
  FirebaseErrorMsgForgot,
  hasLoadingButtonForgot,
  hasErrorForgot,
  passowrdForget,
}) {
  const { t, i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <>
          <Model closeFunc={closeFunc}>
              <h1 className="SignH1" dir="rtl">
                نسيت كلمة السر؟
              </h1>
              <br />
              <input
                required
                type="email"
                placeholder="ادخل البريد الالكتروني"
                onChange={(eo) => {
                  setEmailsend(eo.target.value);
                }}
              />
              <button
                className="sendBtnForget"
                onClick={(eo) => {
                  resetpass(eo);
                }}
                style={{ width: "62.5%" }}
              >
                {hasLoadingButtonForgot ? <div className="small"></div> : "ارسل"}
              </button>
              {hasErrorForgot && (
                <p className="errorMsg">{FirebaseErrorMsgForgot}</p>
              )}
              {passowrdForget && (
                <div className={`account pcoyemail ${passowrdForget}`}>
                  <p>شيك على البريد الالكتروني</p>
                </div>
              )}
              <br />
          </Model>
      </>
    );
  }

  if (i18n.language === "en") {
    return (
      <>
        <Model closeFunc={closeFunc}>
          <h1 className="SignH1" dir="ltr">
            Forgot Password?
          </h1>
          <br />
          <input
            required
            type="email"
            placeholder="Type your email"
            onChange={(eo) => {
              setEmailsend(eo.target.value);
            }}
          />
          <button
            className="sendBtnForget"
            onClick={(eo) => {
              resetpass(eo);
            }}
            style={{ width: "62.5%" }}
          >
            {hasLoadingButtonForgot ? <div className="small"></div> : "Send"}
          </button>
          {hasErrorForgot && (
            <p className="errorMsg">{FirebaseErrorMsgForgot}</p>
          )}
          {passowrdForget && (
            <div className={`account pcoyemail ${passowrdForget}`}>
              <p>We've sent you a message in the email</p>
            </div>
          )}
          <br />
        </Model>
      </>
    );
  }
}

export default ForgotModel;
