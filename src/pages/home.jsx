/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "./error";
import LoadingComp from "../components/Loading";
import HomeModel from "../components/models/HomeModel";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import DataProvider from "../context/DataContext";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import "../components/styles/loading.css";
import "./styles/home.css";
import AllTasksSec from "../components/AllTasksSec";
import { collection, orderBy, query, limit } from "firebase/firestore";
import { useTranslation } from "react-i18next";

function home() {
  const { theme } = useContext(DataProvider);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [subTasksArray, setSubTasksArray] = useState([]);
  const [subTask, setSubTask] = useState("");

  const [titleTask, setTitleTask] = useState("");
  const [hasLoadingButton, setHasLoadingButton] = useState(false);

  const [succMsgBoll, setSuccMsgBoll] = useState(false);
  const { t, i18n } = useTranslation();

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

  // when you click on "send again" button
  const sendAgain = (eo) => {
    eo.preventDefault();
    sendEmailVerification(auth.currentUser).then(() => {
      // ...
    });
  };

  // ========================
  //    Functions Of Model
  // ========================

  // when you want to close model
  const closeFunc = () => {
    setShowModal(false);
    setSubTasksArray([]);
    setTitleTask("");
  };
  // title input of task title
  const titleInput = (eo) => {
    setTitleTask(eo.target.value);
  };
  // sub tasks input of sub tasks
  const subTasksInput = (eo) => {
    setSubTask(eo.target.value);
  };
  // when you click on send sub tasks to array
  const sendSubTasksBtn = (eo) => {
    eo.preventDefault();
    if (!subTasksArray.includes(subTask)) {
      subTasksArray.push(subTask);
    }
    setSubTask("");
    // const [id, setId] = useState(`${new Date().getTime()}`);
  };
  // when you click on send everthing in tasks to database
  const sendFullTaskBtn = async (eo) => {
    eo.preventDefault();
    setHasLoadingButton(true);
    const TaskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${TaskId}`), {
      completed: false,
      title: titleTask,
      details: subTasksArray,
      id: TaskId,
    });
    setSubTasksArray([]);
    setShowModal(false);
    setTitleTask("");
    setHasLoadingButton(false);
    setTimeout(() => {
      setSuccMsgBoll(true);
    }, 10);
    setTimeout(() => {
      setSuccMsgBoll(false);
    }, 2300);
  };

  if (!user) {
    return (
      <>
        <div className={`App ${localStorage.getItem("theme")}`}>
          <Helmet>
            <title>
              {i18n.language === "ar"
                ? "مهامك - الصفحة الرئيسية"
                : "Mahamuk - Home Center"}
            </title>{" "}
            <meta
              name="description"
              content="سلام عليكم هذا هو موقع الشيخ تميم السهلي الرسمي"
            />
          </Helmet>
          <Header />
          <main id="main">
            <section className="helloSec">
                <Link to={"/SignIn"} style={{ textDecoration: "none" }}>
                  <h3 className="Phello">
                    {i18n.language === "ar"
                      ? "من فضلك سجل دخولك للمتابعة"
                      : "Please Sign In to Continue"}
                  </h3>
                  <h3 className="Phello2">
                    {i18n.language === "ar"
                      ? "للمتابعة سجل دخولك"
                      : "Please Sign In to Continue"}
                  </h3>
                </Link>
            </section>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </main>

          <Footer />
        </div>
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <div className={`App ${localStorage.getItem("theme")}`}>
            <Helmet>
              <title>
                {i18n.language === "ar"
                  ? "مهامك - الصفحة الرئيسية"
                  : "Mahamuk - Home Center"}
              </title>
              <meta
                name="description"
                content="سلام عليكم هذا هو موقع الشيخ تميم السهلي الرسمي"
              />
            </Helmet>
            <Header />
            <main id="main">
              <section className="helloSec">
                <h3 className="Phello">
                  {i18n.language === "ar" && "شيك على البريد الالكتروني"}
                  {i18n.language === "en" && "Please confirm your email"}
                </h3>
                <h3 className="Phello2">
                  {i18n.language === "ar" && "شيك على البريد الالكتروني"}
                  {i18n.language === "en" && "Please confirm your email"}
                </h3>
                <br />
                <form>
                  <button
                    onClick={(eo) => {
                      sendAgain(eo);
                    }}
                  >
                    {i18n.language === "ar" && "إرسال مرة اخرى"}
                    {i18n.language === "en" && "Send Again"}
                  </button>
                </form>
              </section>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </main>

            <Footer />
          </div>
        </>
      );
    }

    if (user.emailVerified) {
      updateDoc(doc(db, user.email, "user data"), {
        email_verfiy: true
      })

      return (
        <>
          <div className={`App ${localStorage.getItem("theme")}`}>
            <Helmet>
              <title>
                {i18n.language === "ar"
                  ? "مهامك - الصفحة الرئيسية"
                  : "Mahamuk - Home Center"}
              </title>
              <meta
                name="description"
                content="سلام عليكم هذا هو موقع الشيخ تميم السهلي الرسمي"
              />
            </Helmet>
            <Header />
            <main id="main" className="home">
              {/* <ReactLoading type={"spokes"} color={"white"} height={667} width={375} /> */}
              {showModal && (
                <HomeModel
                  closeFunc={closeFunc}
                  titleInput={titleInput}
                  titleTask={titleTask}
                  subTasksInput={subTasksInput}
                  subTask={subTask}
                  sendSubTasksBtn={sendSubTasksBtn}
                  subTasksArray={subTasksArray}
                  sendFullTaskBtn={sendFullTaskBtn}
                  hasLoadingButton={hasLoadingButton}
                />
              )}
              {/* all tasks */}
              <AllTasksSec user={user} />
              {/* add new task button */}
              <section className="parent_of_buttons flex">
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  {i18n.language === "ar" && "انشاء مهمة جديدة"}
                  {i18n.language === "en" && "Add New Task"}
                </button>
              </section>
              {/* send messege when you added your task */}
              <p
                className="send_messege"
                style={{ right: succMsgBoll ? "20px" : "-200vw" }}
              >
                {" "}
                {i18n.language === "ar" && "لقد تم انشاء المهمة بنجاح"}
                {i18n.language === "en" &&
                  "The task has been created successfully"}
                <span className="icon-checkmark-outline"></span>
              </p>
            </main>
            <Footer />
          </div>
        </>
      );
    }
  }
}

export default home;
