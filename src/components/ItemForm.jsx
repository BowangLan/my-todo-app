import React, { useCallback, useMemo } from "react";
import Circle from "../assets/Circle.jsx";
import { useGlobalContext } from "../context";
import { v4 as uuid } from "uuid";

const ItemFormInner = ({
  classes,
  setTodoList,
  formText,
  setFormText,
  isDark,
}) => {
  console.log(`Rendering ListItme form: ${formText}`);

  const localClasses = {
    outerContainer: ["item-form", isDark ? "dark-shadow" : "light-shadow"].join(
      " "
    ),
    container: ["list-item-container", classes.bg2].join(" "),
    input: [classes.colorPrimary].join(" "),
    left: ["icon", "unchecked-icon"].join(" "),
  };

  const handleSubmit = useCallback((text) => {
    console.log("Handle submit");
    setTodoList((old) => {
      return [
        ...old,
        {
          text,
          check: false,
          id: uuid(),
        },
      ];
    });
    setFormText("");
  }, []);

  const handleChange = useCallback((e) => {
    setFormText(e.currentTarget.value);
    console.log("handle change");
  }, []);

  return (
    <div className={localClasses.outerContainer}>
      <div className={localClasses.container}>
        <div className="list-item-left">
          <Circle className={localClasses.left} color={classes.colorPrimary} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formText);
            }}
          >
            <input
              className={localClasses.input}
              type="text"
              value={formText}
              onChange={(e) => handleChange(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

const ItemForm = ({}) => {
  const { classes, setTodoList, formText, setFormText, isDark } =
    useGlobalContext();
  return useMemo(
    () => (
      <ItemFormInner
        classes={classes}
        setTodoList={setTodoList}
        formText={formText}
        setFormText={setFormText}
        isDark={isDark}
      />
    ),
    [classes, formText]
  );
};

export default ItemForm;
