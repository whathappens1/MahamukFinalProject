/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import "./styles/loading.css";
import Moment from "react-moment";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";

function AllTasksSec({ user }) {
  const [order, setOrder] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );

  const [value, loading, error] = useCollection(
    // asc && desc
    order
  );

  const [selectValue, setSelectValue] = useState("All");
  const { i18n } = useTranslation();
  const [fullOpacity, setFullOpacity] = useState(false);

  const SelectorCommand = (eo) => {
    if (eo.target.value === "All") {
      setOrder(query(collection(db, user.uid), orderBy("id")));
      setSelectValue("All");
      setFullOpacity(false);
    } else if (eo.target.value === "Notcompleted") {
      setOrder(
        query(collection(db, user.uid), where("completed", "==", false))
      );
      setSelectValue("Notcompleted");
    } else if (eo.target.value === "Completed") {
      setOrder(query(collection(db, user.uid), where("completed", "==", true)));
      setSelectValue("Completed");
    }
  };

  if (loading) {
    return (
      <div
        className="loading"
        style={{
          width: "120px",
          height: "120px",
          margin: "75px auto -5px auto",
        }}
      ></div>
    );
  }

  if (error) {
    return <h1>error</h1>;
  }

  if (value) {
    if (value.docs.length === 0) {
      return (
        <>
          <section className="parent_of_buttons flex">
            {selectValue === "All" && (
              <>
                <button
                  style={{ opacity: fullOpacity ? "1" : "0.7" }}
                  onClick={(eo) => {
                    setOrder(
                      query(collection(db, user.uid), orderBy("id", "desc"))
                    );
                    setFullOpacity(true);
                  }}
                >
                  {i18n.language === "ar" && "المهام الجديدة"}
                  {i18n.language === "en" && "Newest first"}
                </button>
                <button
                  style={{ opacity: fullOpacity ? "0.7" : "1" }}
                  onClick={(eo) => {
                    setOrder(
                      query(collection(db, user.uid), orderBy("id", "asc"))
                    );
                    setFullOpacity(false);
                  }}
                >
                  {i18n.language === "ar" && "المهام القديمة"}
                  {i18n.language === "en" && "Oldest first"}
                </button>
              </>
            )}
            <select
              id="selectors"
              value={`${selectValue}`}
              onChange={(eo) => {
                SelectorCommand(eo);
              }}
            >
              <option value="All">
                {" "}
                {i18n.language === "ar" && "كل المهام"}
                {i18n.language === "en" && "All Tasks"}
              </option>
              <option value="Completed">
                {" "}
                {i18n.language === "ar" && "المهام المكتملة"}
                {i18n.language === "en" && "Completed Tasks"}
              </option>
              <option value="Notcompleted">
                {" "}
                {i18n.language === "ar" && "المهام الغير مكتملة"}
                {i18n.language === "en" && "Not Completed Tasks"}
              </option>
            </select>
          </section>
          <section>
            <main>
              <h1 className="notFoundText" style={{ marginTop: "160px" }}>
                {i18n.language === "ar" && "للاسف.. لم نجد اي مهام"}
                {i18n.language === "en" && "Sorry.. We did not find any tasks"}
              </h1>
            </main>
          </section>
        </>
      );
    }

    return (
      <>
        {/* filtered data */}
        <section className="parent_of_buttons flex">
          {selectValue === "All" && (
            <>
              <button
                style={{ opacity: fullOpacity ? "1" : "0.7" }}
                onClick={(eo) => {
                  setOrder(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                  setFullOpacity(true);
                }}
              >
                {i18n.language === "ar" && "المهام الجديدة"}
                {i18n.language === "en" && "Newest first"}
              </button>
              <button
                style={{ opacity: fullOpacity ? "0.7" : "1" }}
                onClick={(eo) => {
                  setOrder(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                  setFullOpacity(false);
                }}
              >
                {i18n.language === "ar" && "المهام القديمة"}
                {i18n.language === "en" && "Oldest first"}
              </button>
            </>
          )}
          <select
            id="selectors"
            value={`${selectValue}`}
            onChange={(eo) => {
              SelectorCommand(eo);
            }}
          >
            <option value="All">
              {" "}
              {i18n.language === "ar" && "كل المهام"}
              {i18n.language === "en" && "All Tasks"}
            </option>
            <option value="Completed">
              {" "}
              {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed Tasks"}
            </option>
            <option value="Notcompleted">
              {" "}
              {i18n.language === "ar" && "المهام الغير مكتملة"}
              {i18n.language === "en" && "Not Completed Tasks"}
            </option>
          </select>
        </section>

        <section className="all_tasks">
          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one_task">
                <Link to={`/status/${item.data().id}`}>
                  <h2
                    style={
                      item.data().completed === true
                        ? { textDecoration: "line-through", opacity: "0.7" }
                        : { textDecoration: "none", opacity: "1" }
                    }
                  >
                    {item.data().title}
                  </h2>
                  <ul dir="auto">
                    {item.data().details.map((item, index) => {
                      if (index < 3) {
                        return <li key={item}>{item}</li>;
                      }
                    })}
                  </ul>
                  <p className="time" dir="auto">
                    {<Moment fromNow>{item.data().id}</Moment>}
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </>
    );
  }
}

export default AllTasksSec;
