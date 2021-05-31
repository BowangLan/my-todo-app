import React, { useMemo } from "react";
import "./styles/utils.scss";
import "./App.scss";
import TitleBar from "./components/TitleBar";
import ItemForm from "./components/ItemForm";
import MainContent from "./components/MainContent";
import { useGlobalContext } from "./context";

const App1 = () => {
  const { classes, isDark, isMobile } = useGlobalContext();
  console.log(`Rendering app... dark:${isDark}`);

  const mainContainer = [
    "main-container",
    classes.bg,
    isMobile ? classes.bgImg.mobile : classes.bgImg.desktop,
  ].join(" ");

  const contentContainerClasses = [
    "content-container",
    isMobile ? null : classes.shadow,
    isMobile ? null : "round",
  ].join(" ");

  return (
    <>
      {/* Background Image
      <div className="main-bg-img">
        <img src={"images/bg-desktop-light.jpg"} />
      </div> */}
      <div className={mainContainer} data-theme={isDark ? "dark" : "light"}>
        {/* Title Bar */}
        <TitleBar />

        {/* Create new item */}

        <ItemForm />

        <MainContent />

        <span
          className={[classes.colorSecondary]}
          style={{
            marginTop: "35px",
            fontSize: "14px",
          }}
        >
          Drag and drop to reorder list
        </span>
      </div>
    </>
  );
};

export default App1;
