import React, { useMemo, useCallback } from "react";
import { useGlobalContext } from "../context";
import CheckIcon from "../assets/CheckIcon";
import CrossIcon from "../assets/CrossIcon";
import Circle from "../assets/Circle";
import "./ListItem.scss";

const ListItemInner = ({ item, classes: classes_, setTodoList }) => {
  const { text, id, check } = item;
  console.log(`Rendering ListItme: ${id}  ${text}`);

  const classes = {
    container: ["list-item-container", classes_.bg2].join(" "),
    text: [
      "item-text",
      check ? "checked-input" : null,
      check ? classes_.colorHover : classes_.colorPrimary,
    ].join(" "),
    left: ["icon", check ? "checked-icon" : "unchecked-icon"].join(" "),
  };

  const handleCheck = useCallback((id) => {
    console.log("Handle check");
    setTodoList((preValue) =>
      preValue.map((item) => {
        if (item.id == id) {
          return { ...item, check: !item.check };
        } else {
          return item;
        }
      })
    );
  }, []);

  const handleDelete = useCallback((id) => {
    console.log("app delete index: ", id);
    setTodoList((preValue) => preValue.filter((item) => id != item.id));
  }, []);

  const LeftIcon = check ? (
    <span
      className={classes.left}
      onClick={handleCheck ? () => handleCheck(id) : null}
    >
      <CheckIcon />
    </span>
  ) : (
    <span className={classes.left} onClick={() => handleCheck(id)}>
      <Circle />
    </span>
  );
  return (
    <div className={classes.container}>
      <div className="list-item-left">
        {LeftIcon}
        <span className={classes.text}>{text}</span>
      </div>
      <span
        className="icon cross-icon"
        onClick={handleDelete ? () => handleDelete(id) : null}
      >
        <CrossIcon />
      </span>
    </div>
  );
};

const ListItem = (props) => {
  const { classes, setTodoList } = useGlobalContext();
  return useMemo(
    () => (
      <ListItemInner {...props} classes={classes} setTodoList={setTodoList} />
    ),
    [classes, ...Object.values(props)]
  );
};

export default ListItem;
