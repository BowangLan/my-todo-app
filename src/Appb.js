import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Container, ListGroup, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import ListItem from "./components/ListItem";

import "./Appb.scss";

const Item = ({ id, text, handleClick }) => {
  console.log("Rendering ", text);
  return (
    // <CSSTransition key={id} timeout={500} classNames="item">
    <div>
      <Button
        className="remove-btn"
        variant="danger"
        size="sm"
        onClick={() => handleClick(id)}
      >
        &times;
      </Button>
      {text}
    </div>
    // </CSSTransition>
  );
};

function Appb() {
  const [items, setItems] = useState([
    { id: uuid(), text: "Buy eggs" },
    { id: uuid(), text: "Pay bills" },
    { id: uuid(), text: "Invite friends over" },
    { id: uuid(), text: "Fix the TV" },
  ]);
  console.log(items);

  const handleClick = React.useCallback((id) => {
    setItems((items) => {
      console.log("Setting items", id);
      return items.filter((item) => item.id !== id);
    });
  }, []);

  const itemComponent = (
    <TransitionGroup className="list-container">
      {items.map(({ id, text }) => (
        <CSSTransition key={id} timeout={1000} classNames="item">
          {/* <Item
            id={id}
            text={text}
            handleClick={handleClick}
          /> */}
          <ListItem
            text={text}
            id={id}
            check={false}
            handleDelete={handleClick}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        {itemComponent}
        {/* {items.map(({ id, text }) => (
            <CSSTransition key={id} timeout={500} classNames="item">
              <div>
                <Button
                  className="remove-btn"
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    setItems((items) => {
                      return items.filter((item) => item.id !== id);
                    })
                  }
                >
                  &times;
                </Button>
                {text}
              </div>
            </CSSTransition>
          ))} */}
      </div>
      <Button
        onClick={() => {
          const text = prompt("Enter some text");
          if (text) {
            setItems((items) => [...items, { id: uuid(), text }]);
          }
        }}
      >
        Add Item
      </Button>
    </div>
  );
}

export default Appb;
