/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import './styles/loading.css';
import DataProvider from "../context/DataContext";
import { useContext } from "react";

function loading() {
  const { toggleTheme } = useContext(DataProvider);

  return (
    <div className={`App ${localStorage.getItem("theme")}`}>
      {/* <Header /> */}
      <main id="main">
        {/* <div className="loadingGif">
          <img id="loadingPhoto" src="https://media.discordapp.net/attachments/1045274385382133783/1058700740392144896/Red_Flower_PNG_Deco_Image.png?width=535&height=468" alt="" />
        </div> */}
        <div className="loading"></div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default loading