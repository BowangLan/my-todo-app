import React, { useMemo, useCallback } from "react";
import { useGlobalContext } from "../context";
import "./TabBar.scss";

const TabBarInner = ({
  classes: classes_,
  todoList,
  handleClear,
  isMobile,
  tabList,
  currentTab,
  setCurrentTab,
}) => {
  console.log("Rendering TabBar...");
  const classes = useMemo(
    () => ({
      container: [
        "tab-bar-container",
        classes_.bg2,
        classes_.colorSecondary,
        isMobile ? "round" : null,
      ].join(" "),
      leftText: ["left-text", isMobile ? "none" : null].join(" "),
      rightText: ["right-text", "pointer", isMobile ? "none" : null].join(" "),
    }),
    [classes_, isMobile]
  );

  return (
    <div className={classes.container}>
      <span className={classes.leftText}>{`${todoList.length} item${
        todoList.length > 1 ? "s" : ""
      } left`}</span>
      <div className="middle-container">
        {tabList.map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => setCurrentTab(index)}
              className={currentTab == index ? "active-tab" : "tab"}
            >
              {item}
            </span>
          );
        })}
      </div>
      <span className={classes.rightText} onClick={handleClear}>
        Clear Completed
      </span>
    </div>
  );
};

const TabBar = () => {
  const {
    classes,
    todoList,
    handleClear,
    isMobile,
    tabList,
    currentTab,
    setCurrentTab,
  } = useGlobalContext();
  return useMemo(
    () => (
      <TabBarInner
        classes={classes}
        todoList={todoList}
        handleClear={handleClear}
        isMobile={isMobile}
        tabList={tabList}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    ),
    [classes, isMobile, currentTab]
  );
};

export default TabBar;
