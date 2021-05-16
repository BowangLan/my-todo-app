import React from "react";
import "./styles/utils.scss";
import "./App.scss";
import TitleBar from "./components/TitleBar";
import TabBar from "./components/TabBar";
import DNDListContainer from "./components/DNDListContainer";
import List from "./components/List";
import ItemForm from "./components/ItemForm";
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
  ].join(" ");

  return (
    <>
      {/* Background Image
      <div className="main-bg-img">
        <img src={"images/bg-desktop-light.jpg"} />
      </div> */}
      <div className={mainContainer}>
        {/* Title Bar */}
        <TitleBar />

        {/* Create new item */}
        <div
          className={"item-form " + (isDark ? "dark-shadow" : "light-shadow")}
        >
          <ItemForm />
        </div>

        {/* List */}
        <div
          className={contentContainerClasses}
          style={isMobile ? { gap: "24px", borderRadius: "none" } : {}}
        >
          <DNDListContainer>
            <List />
          </DNDListContainer>
          <TabBar />
        </div>

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
