import React from "react";
import List from "./List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DNDListContainer = ({ children }) => {
  const { todoList, setTodoList } = useGlobalContext();

  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const newValue = reorder(
        todoList,
        result.source.index,
        result.destination.index
      );

      setTodoList(newValue);
    },
    [todoList]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(DNDListContainer);
