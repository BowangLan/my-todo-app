import React from "react";
import ListItem from "./ListItem";
import { Draggable } from "react-beautiful-dnd";

const DNDListItem = ({ index, item }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem item={item} />
        </div>
      )}
    </Draggable>
  );
};

export default DNDListItem;
