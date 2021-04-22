import React from "react";
import { Card } from "../card/Card";
import "./Todo.css";
import dnd, { Draggable, DroppableStateSnapshot } from "react-beautiful-dnd";

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
  snapshot: DroppableStateSnapshot;
}

const Todo: React.FC<Props> = ({ todoList, setList, provided, snapshot }) => {
  // console.log(provided);
  return (
    <div
      className="todo"
      style={{ backgroundColor: snapshot.isDraggingOver ? "#a7deab" : "" }}
    >
      <p className="todo__title">Tasks</p>
      <div
        className="todo__cards"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {todoList &&
          todoList.map((item, index) => (
            <Draggable draggableId={item.Key} index={index} key={item.Key}>
              {(provide, snapshott) => (
                <Card
                  provided={provide}
                  snapshot={snapshott}
                  data={item}
                  setList={setList}
                />
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default React.memo(Todo);
