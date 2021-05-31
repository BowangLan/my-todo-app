import React, { useState, useContext, useCallback } from "react";
import useTheme from "./useTheme";
import { jsx, ThemeProvider } from "@emotion/react";
import useMobile from "./useMobile";
import useLocalStorage from "./useLocalStorage";

const globalContext = React.createContext();

const mobileMaxWidth = 460;

const GlobalContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useLocalStorage("todoList", []);
  const [currentTab, setCurrentTab] = useState(0);
  const tabList = ["All", "Active", "Completed"];
  const [formText, setFormText] = useState("");
  const [classes, isDark, setIsDark] = useTheme(false);
  const [isMobile, setIsMobile] = useMobile(mobileMaxWidth);

  const handleClear = useCallback(() => {
    setTodoList((preList) => preList.filter((item) => !item.check));
  }, []);

  return (
    <globalContext.Provider
      value={{
        todoList,
        setTodoList,
        handleClear,
        tabList,
        currentTab,
        setCurrentTab,
        formText,
        setFormText,
        classes,
        isDark,
        setIsDark,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(globalContext);
  // console.log(context);
  return context;
};

export { GlobalContextProvider, useGlobalContext };
