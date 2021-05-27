import React, { useEffect, useMemo } from "react";
// import "./ListContainer.scss";
import DNDListItem from "./DNDListItem";
import { useGlobalContext } from "../context";
import { v4 as uuid } from "uuid";

const ListInner = ({ todoList, setTodoList, currentTab }) => {
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
    <>
      {currentTodoList.map((item, index) => {
        return (
          <div key={item.id} timeout={300} classNames="item">
            <DNDListItem index={index} item={item} />
          </div>
        );
      })}
    </>
  );
};

const List = ({}) => {
  const { todoList, setTodoList, currentTab } = useGlobalContext();
  return useMemo(
    () => (
      <ListInner
        todoList={todoList}
        setTodoList={setTodoList}
        currentTab={currentTab}
      />
    ),
    [todoList, currentTab]
  );
};

export default List;
