import React, { useEffect, useMemo } from "react";
// import "./ListContainer.scss";
import DNDListItem from "./DNDListItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useGlobalContext } from "../context";
import { v4 as uuid } from "uuid";

const List = ({}) => {
  const { classes, todoList, setTodoList, currentTab, isMobile } =
    useGlobalContext();

  const containerClasses = useMemo(
    () =>
      [
        "list-container",
        classes.bg,
        isMobile ? classes.shadow : null,
        isMobile ? "round" : null,
      ].join(" "),
    [classes, isMobile]
  );

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if (!storedTodoList) {
      console.log("Empty storage, initializing todo list...");
      setTodoList([
        { id: uuid(), text: "Buy eggs" },
        { id: uuid(), text: "Pay bills" },
        { id: uuid(), text: "Invite friends over" },
        { id: uuid(), text: "Fix the TV" },
      ]);
      // localStorage.setItem("todoList", JSON.stringify(todoList));
    } else {
      console.log("Retreiving stored todo list...");
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  let currentTodoList;
  switch (currentTab) {
    case 0:
      currentTodoList = todoList;
      break;
    case 1:
      currentTodoList = todoList.filter((item) => !item.check);
      break;
    case 2:
      currentTodoList = todoList.filter((item) => item.check);
      break;
  }

  console.log("Rendering list...");

  return (
    <TransitionGroup className={containerClasses}>
      {currentTodoList.map((item, index) => {
        return (
          <CSSTransition key={item.id} timeout={300} classNames="item">
            <DNDListItem index={index} item={item} />
            {/* <ListItem
              text={item.text}
              id={item.id}
              check={item.check}
              {...itemProps}
            /> */}
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default React.memo(List);
