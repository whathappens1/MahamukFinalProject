import Model from "../Model";
import "../styles/loading.css";
import { useTranslation } from "react-i18next";

function AddSubTask({
  closeFunc,
  subTasksInput,
  subTask,
  sendFullTaskBtn,
  hasLoadingButton,
}) {
  const { i18n } = useTranslation();

  return (
    <>
      <Model closeFunc={closeFunc}>
        <div
          className="model_content"
          style={{ width: "60%", margin: "0 auto" }}
        >
          {/* <div> */}
          <h1 className="SignH1" dir="auto">
            {i18n.language === "ar" && "مهمة فرعية"}
            {i18n.language === "en" && "Sub-Task"}
          </h1>
          <br />
          <input
            type="text"
            id="brokeIput"
            dir="auto"
            placeholder={`${i18n.language === "en" ? "Sub-Task" : "مهمة فرعية" }`}
            onChange={(eo) => {
              subTasksInput(eo);
            }}
            value={subTask}
          />
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

export default AddSubTask;
