import React, { useMemo } from "react";
import TabBar from "./TabBar";
import DNDListContainer from "./DNDListContainer";
import { useGlobalContext } from "../context";

const MainContentInner = ({ classes, todoList, handleClear, isMobile }) => {
  const contentContainerClasses = [
    "content-container",
    classes.shadow,
    "round",
    "my-25",
  ].join(" ");
  const upperTabbarClasses = [
    // "tab-bar-container",
    "mobile-upper-tab-bar",
    classes.bg2,
    classes.colorSecondary,
  ].join(" ");
  if (isMobile) {
    const innerContentContainer = [
      "content-container",
      classes.shadow,
      "round",
    ].join(" ");
    return (
      <div
        className={contentContainerClasses}
        style={{ gap: "24px", borderRadius: "none" }}
      >
        <div className={innerContentContainer}>
          <DNDListContainer />
          <div className={upperTabbarClasses}>
            <span className={""}>{`${todoList.length} item${
              todoList.length > 1 ? "s" : ""
            } left`}</span>
            <span className={"pointer"} onClick={handleClear}>
              Clear Completed
            </span>
          </div>
        </div>
        <TabBar />
      </div>
    );
  } else {
    return (
      <div className={contentContainerClasses}>
        <DNDListContainer />
        <TabBar />
      </div>
    );
  }
};

const MainContent = () => {
  const { classes, todoList, handleClear, isMobile } = useGlobalContext();
  return useMemo(
    () => (
      <MainContentInner
        classes={classes}
        todoList={todoList}
        handleClear={handleClear}
        isMobile={isMobile}
      />
    ),
    [classes, todoList, isMobile]
  );
};

export default MainContent;
