/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Error from "../pages/error";
import LoadingComp from "./Loading";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

function editMain({
  user,
  succMsgBoll,
  succDeleteLiMsgBoll,
  succAddLiMsgBoll,
  ErrorMsgBoll,
  id,
  titleChengeValue,
  updataNewTitle,
  CheckboxChange,
  TrashIconDelete,
  addMoreButton,
  deleteButton,
  inputElement
}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const { i18n } = useTranslation();

  if (loading) {
    return <LoadingComp />;
  }

  if (error) {
    <Error />;
  }

  if (value) {
    return (
      <>
        {/* titie */}
        <section className="title_parent center">
          <h1>
            <input
              type="text"
              style={
                value.data().completed === true
                  ? { textDecoration: "line-through", opacity: "0.7" }
                  : { textDecoration: "none", opacity: "1" }
              }
              className="titleInput"
              ref={inputElement}
              defaultValue={value.data().title}
              placeholder={`${
                i18n.language === "en" ? "Type task title" : "اكتب عنوان المهمة"
              }`}
              onChange={(eo) => {
                titleChengeValue(eo);
              }}
            />
            <span
              className="icon-edit editIcon"
              onClick={async () => {
                updataNewTitle();
              }}
            ></span>
          </h1>
        </section>
        {/* sub-tasks */}
        <section className="sub_tasks">
          <div className="top_ele_parent">
            <p>{<Moment fromNow>{Number(id)}</Moment>}</p>
            {i18n.language === "ar" && (
              <div className="parent_of_checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={value.data().completed}
                  onChange={(eo) => {
                    CheckboxChange(eo);
                  }}
                />
                <label htmlFor="checkbox" style={{ margin: "0 5px" }}>
                  :انتهى المهمة
                </label>
              </div>
            )}
            {i18n.language === "en" && (
              <div className="parent_of_checkbox">
                <label htmlFor="checkbox" style={{ margin: "0 5px" }}>
                  Completed Task:
                </label>
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={value.data().completed}
                  onChange={(eo) => {
                    CheckboxChange(eo);
                  }}
                />
              </div>
            )}
          </div>
          <div className="ul_of_cards">
            <div className="parebt_of_li">
              {value.data().details.map((item) => {
                return (
                  <div key={item} className="card_task flex">
                    <p>{item}</p>
                    <span
                      className="icon-cross"
                      onClick={() => {
                        TrashIconDelete(item);
                      }}
                    ></span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* bottom buttons */}
        <section className="bottom_buttons">
          <button
            onClick={(eo) => {
              addMoreButton(eo);
            }}
          >
            {i18n.language === "ar" && "اضافة المزيد"}
            {i18n.language === "en" && "Add more"}
          </button>
          <br />
          <button
            onClick={(eo) => {
              deleteButton(eo);
            }}
          >
            {i18n.language === "ar" && "إلغاء المهمة"}
            {i18n.language === "en" && "Delete Task"}
          </button>

                  {/* masseges */}
        <p
          className="send_messege"
          style={{ right: succMsgBoll ? "20px" : "-200vw" }}
        >
          {i18n.language === "ar" && "لقد تم تغيير المعلومات بنجاح"}
          {i18n.language === "en" && "The data has been changed successfully"}
          <span className="icon-checkmark-outline"></span>
        </p>
        <p
          className="send_messege"
          style={{ right: succDeleteLiMsgBoll ? "20px" : "-200vw" }}
        >
          {" "}
          {i18n.language === "ar" && "لقد تم حذف المهمة الفرعية بنجاح"}
          {i18n.language === "en" &&
            "The sub-task has been successfully deleted"}
          <span className="icon-checkmark-outline"></span>
        </p>
        <p
          className="send_messege"
          style={{ right: succAddLiMsgBoll ? "20px" : "-200vw" }}
        >
          {i18n.language === "ar" && "لقد تم إضافة المهمة الفرعية"}
          {i18n.language === "en" && "The sub-task has been added"}
          <span className="icon-checkmark-outline"></span>
        </p>
        <p
          className="send_messege"
          style={{ right: ErrorMsgBoll ? "20px" : "-200vw" }}
        >
          {i18n.language === "ar" && "حدث خطا ما حاول مرة اخرى"}
          {i18n.language === "en" && "Something went wrong Try again"}
        </p>
        </section>

      </>
    );
  }
}

export default editMain;
