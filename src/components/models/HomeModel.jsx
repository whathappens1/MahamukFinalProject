import Model from "../Model";
import { useTranslation } from "react-i18next";

function HomeModel({
  closeFunc,
  titleInput,
  titleTask,
  subTasksInput,
  subTask,
  sendSubTasksBtn,
  subTasksArray,
  sendFullTaskBtn,
  hasLoadingButton
}) {
  const { i18n } = useTranslation();

  return (
    <>
      <Model closeFunc={closeFunc}>
        <div
          className="model_content"
          style={{ width: "60%", margin: "0 auto" }}
          dir="auto"
        >
          {/* <div> */}
          <h1 className="SignH1" dir="auto">
            {i18n.language === "ar" && "مهمة جديدة"}
            {i18n.language === "en" && "New Task"}
          </h1>
          <br />
          <input
            type="text"
            id="brokeIput"
            placeholder={`${
              i18n.language === "en" ? "Task title" : "عنوان المهمة"
            }`}
            onChange={(eo) => {
              titleInput(eo);
            }}
            value={titleTask}
          />
          <div
            className="flex"
            style={{
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              id="subTasksInput"
              placeholder={`${
                i18n.language === "en" ? "Sub-task" : "مهمة فرعية"
              }`}
              onChange={(eo) => {
                subTasksInput(eo);
              }}
              value={subTask}
            />
            <button
              className="sendBtnForget"
              style={{ marginLeft: "3px" }}
              onClick={(eo) => {
                sendSubTasksBtn(eo);
              }}
            >
              {i18n.language === "ar" && "إضافة مهمة"}
              {i18n.language === "en" && "Add Sub-task"}
            </button>
          </div>
          <ul id="subtasksModal">
            {subTasksArray.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
          <button
            className="sendBtnForget"
            style={{ width: "100%" }}
            onClick={async (eo) => {
              sendFullTaskBtn(eo);
            }}
          >
            {hasLoadingButton ? <div className="small"></div> : i18n.language === "en" ? "Send" : "ارسل"}
          </button>
        </div>
        <br />
      </Model>
    </>
  );
}

export default HomeModel;
