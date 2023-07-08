/* eslint-disable eqeqeq */
import { createContext, useReducer } from "react";

const ThemeContexttt = createContext();

const initialData = {
  theme: "light",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.newValue };
    default:
      return state;
  }
};
export function DataProvider({ children }) {
  
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const body = document.getElementById("body")
  
  const toggleTheme = (newMode) => {
    dispatch({ type: "CHANGE_THEME", newValue: newMode });
    localStorage.setItem("theme", newMode);

  };
  localStorage.getItem("theme") == "light" ? body.classList.add("darkMode") : body.classList.remove("darkMode");

  return (
    <ThemeContexttt.Provider value={{ ...firstState, toggleTheme }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
