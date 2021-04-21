import React from "react";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Card } from "../card/Card";
import "./Doing.css";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
}

interface DoingProps {
  doneList?: Array<data>;
  setList: React.Dispatch<React.SetStateAction<data[]>>;
  provided: DroppableProvided;
}

export const Doing: React.FC<DoingProps> = ({
  doneList,
  setList,
  provided,
}) => {
  return (
    <div className="todo">
      <p className="todo__title">In Progress</p>
      <div
        className="todo__cards"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {doneList &&
          doneList.map((item, index) => (
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
