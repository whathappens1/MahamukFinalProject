/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import DataProvider from "../context/DataContext";
import { useContext } from "react";
import "./styles/model.css"

// closeFunc => is function to close your "Model"
function modal( {closeFunc, children} ) {
  const { toggleTheme } = useContext(DataProvider);

  return (
    <div className="Perant_ModelPanel">
      <form className={`modelPanel`}>
        <span
          className="icon-cross crossIcon"
          onClick={() => {
            closeFunc();
          }}
        ></span>

        {children}
      </form>
    </div>
  );
}

export default modal;