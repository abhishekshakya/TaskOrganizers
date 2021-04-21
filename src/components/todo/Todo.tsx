import React, { useState } from "react";
import { todoData } from "../../Data/todo";
import { Card } from "../card/Card";
import "./Todo.css";
import dnd, { Draggable, DroppableProvided } from "react-beautiful-dnd";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
}

interface Props {
  todoList?: Array<data>;
  setList: React.Dispatch<React.SetStateAction<data[]>>;
  provided: dnd.DroppableProvided;
}

export const Todo: React.FC<Props> = ({ todoList, setList, provided }) => {
  console.log(provided);
  return (
    <div className="todo">
      <p className="todo__title">Tasks</p>
      <div
        className="todo__cards"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {todoList &&
          todoList.map((item, index) => (
            <Draggable draggableId={item.Key} index={index} key={item.Key}>
              {(provided) => (
                <Card provided={provided} data={item} setList={setList} />
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </div>
    </div>
  );
};
