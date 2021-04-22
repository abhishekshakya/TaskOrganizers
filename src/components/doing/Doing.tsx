import React from "react";
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
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
  snapshot: DroppableStateSnapshot;
}

const Doing: React.FC<DoingProps> = ({
  doneList,
  setList,
  provided,
  snapshot,
}) => {
  return (
    <div
      className="todo"
      style={{ backgroundColor: snapshot.isDraggingOver ? "#a7deab" : "" }}
    >
      <p className="todo__title">In Progress</p>
      <div
        className="todo__cards"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {doneList &&
          doneList.map((item, index) => (
            <Draggable draggableId={item.Key} index={index} key={item.Key}>
              {(provided, snapshott) => (
                <Card
                  snapshot={snapshott}
                  provided={provided}
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

export default React.memo(Doing);
