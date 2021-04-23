import { Sort } from "@material-ui/icons";
import image from "../../working.jpg";
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
  const sortHandler = () => {
    setList((p) => [...p.sort((a, b) => b.Priority - a.Priority)]);
    // console.log("GGGG");
  };
  return (
    <div
      className="todo"
      style={{ backgroundColor: snapshot.isDraggingOver ? "#a7deab" : "" }}
    >
      <p className="todo__title">In Progress</p>
      <div className="todo__sort">
        <Sort style={{ color: "white" }} onClick={sortHandler} />
      </div>

      {
        <div
          className="todo__cards"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {!doneList || doneList.length === 0 ? (
            <div className="imageContainer">
              <img src={image} />
            </div>
          ) : (
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
            ))
          )}
          {provided.placeholder}
        </div>
      }
    </div>
  );
};

export default React.memo(Doing);
