/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import EditMain from "../components/editMain";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useDocument } from "react-firebase-hooks/firestore";
import DataProvider from "../context/DataContext";
import "./styles/status.css";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import AddSubTask from "../components/models/AddSubTask";
import { useTranslation } from "react-i18next";

// import "./styles/public.css"
function status() {
  const { theme } = useContext(DataProvider);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const titleInput = document.getElementsByClassName("titleInput")[0]
  const { t, i18n } = useTranslation();

  let { id } = useParams();
  const [succMsgBoll, setSuccMsgBoll] = useState(false);
  const [succDeleteLiMsgBoll, setSuccDeleteLiMsgBoll] = useState(false);
  const [succAddLiMsgBoll, setSuccAddLiMsgBoll] = useState(false);
  const [ErrorMsgBoll, setErrorMsgBoll] = useState(false);

  // const [value] = useDocument(doc(db, user.uid , id));
  const [showModal, setShowModal] = useState(false);

  const [hasLoadingButton, setHasLoadingButton] = useState(false);
  const [subTask, setSubTask] = useState("");

  const [showData, setShowData] = useState(false);
  const inputElement = useRef(null);

  const [valueItSTrue, setValueItSTrue] = useState(false);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified && !loading) {
        navigate("/");
      }
    }
  });

  // ==============================
  //      Functions Of Designs
  // ==============================

  // to save new value to update him after click on save button
  const titleChengeValue = (eo) => {
    if (eo.target.value === "") {
      setValueItSTrue(false)
      inputElement.current.classList.add("error");
    } else {
      setValueItSTrue(true)
      setTitle(eo.target.value);
      inputElement.current.classList.remove("error");
    }
  };

  // save new title inside database (HappyFace)
  const updataNewTitle = () => {
    if (valueItSTrue === true) {
      updateDoc(doc(db, user.uid, id), {
        title: title
      })
      .then(() => { 
        setSuccMsgBoll(true);
        setTimeout(() => {
          setSuccMsgBoll(false);
        }, 2300);
       })
      .catch() 

    } else {
      inputElement.current.focus();
      setSuccMsgBoll(false);

    }

    // if (title == title) {
    //   // setSuccMsgBoll(true);
    //   // setTimeout(() => {
    //   //   setSuccMsgBoll(false);
    //   // }, 2300);
    // }
  };

  // when click a Checkbox it converted to Completed
  const CheckboxChange = async (eo) => {
    if (eo.target.checked) {
      // console.log("is completed")
      await updateDoc(doc(db, user.uid, id), {
        completed: true,
      });
    } else {
      // console.log("is'nt completed")
      await updateDoc(doc(db, user.uid, id), {
        completed: false,
      });
    }
  };

  // to delete any "sub-tasks" on your tasks
  const TrashIconDelete = async (item) => {
    await updateDoc(doc(db, user.uid, id), {
      details: arrayRemove(item),
    });
    setSuccDeleteLiMsgBoll(true);
    setTimeout(() => {
      setSuccDeleteLiMsgBoll(false);
    }, 2300);
  };

  // to delete your selected task
  const deleteButton = async (eo) => {
    eo.preventDefault();
    setShowData(true);
    await deleteDoc(doc(db, user.uid, id));
    navigate("/", { replace: true });
    // setSuccDeleteTaskMsgBoll(true)
    // setTimeout(() => {
    //   setSuccDeleteTaskMsgBoll(false)
    // }, 2300);
  };

  // to add more "sub-tasks" in your selected task
  const addMoreButton = (eo) => {
    eo.preventDefault();
    setShowModal(true);
  };

  // ========================
  //    Functions Of Model
  // ========================

  // when you want to close model
  const closeFunc = () => {
    setShowModal(false);
    setSubTask("");
  };
  // sub tasks input of sub tasks
  const subTasksInput = (eo) => {
    setSubTask(eo.target.value);
  };
  // when you click on send everthing in tasks to database
  const sendFullTaskBtn = async (eo) => {
    eo.preventDefault();
    setHasLoadingButton(true);
    const TaskId = new Date().getTime();
    await updateDoc(doc(db, user.uid, id), {
      details: arrayUnion(subTask),
    });
    setShowModal(false);
    setSubTask("");
    setHasLoadingButton(false);
    setSuccAddLiMsgBoll(true);
    setTimeout(() => {
      setSuccAddLiMsgBoll(false);
    }, 2300);
  };

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <div className={`App ${localStorage.getItem("theme")}`}>
            <Helmet>
              <title>
                {i18n.language === "ar" ? "مهامك - تفاصيل المهمة" : "Mahamuk - Details Of Task"}
              </title>
              <meta name="description" content="تفاصيل المهمة" />
            </Helmet>
            {showData ? (
              <>
                <Header />
                <Loading />
                <Footer />
              </>
            ) : (
              <>
                <Header />
                {showModal && (
                  <AddSubTask
                    closeFunc={closeFunc}
                    subTasksInput={subTasksInput}
                    subTask={subTask}
                    sendFullTaskBtn={sendFullTaskBtn}
                    hasLoadingButton={hasLoadingButton}
                  />
                )}
                <main id="main" className="edit_task">
                  <EditMain
                    user={user}
                    succDeleteLiMsgBoll={succDeleteLiMsgBoll}
                    succMsgBoll={succMsgBoll}
                    ErrorMsgBoll={ErrorMsgBoll}
                    id={id}
                    titleChengeValue={titleChengeValue}
                    updataNewTitle={updataNewTitle}
                    CheckboxChange={CheckboxChange}
                    TrashIconDelete={TrashIconDelete}
                    addMoreButton={addMoreButton}
                    deleteButton={deleteButton}
                    succAddLiMsgBoll={succAddLiMsgBoll}
                    inputElement={inputElement}
                  />
                </main>
                <Footer />
              </>
            )}
          </div>
        </>
      );
    }
  }
}

export default status;
