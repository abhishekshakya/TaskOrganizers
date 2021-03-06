import { Sort } from "@material-ui/icons";
import React from "react";
import image from "../../worked.jpg";
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { Card } from "../card/Card";
import "./Done.css";
import { SkeletonCard } from "../skeleton/SkeletonCard";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
  Edit: boolean;
}

interface DoneProps {
  doneList?: Array<data>;
  setList: React.Dispatch<React.SetStateAction<data[]>>;
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  loading: boolean;
}

const Done: React.FC<DoneProps> = ({
  doneList,
  setList,
  provided,
  snapshot,
  loading,
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
      <p className="todo__title">Completed</p>
      <div className="todo__sort">
        <Sort style={{ color: "white" }} onClick={sortHandler} />
      </div>

      {
        <div
          className="todo__cards"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {!doneList || doneList.length === 0
            ? !loading && (
                <div className="imageContainer">
                  <img src={image} />
                </div>
              )
            : doneList.map((item, index) => (
                <Draggable draggableId={item.Key} index={index} key={item.Key}>
                  {(provided, snapshott) => (
                    <Card
                      snapshot={snapshott}
                      provided={provided}
                      data={item}
                      setList={setList}
                      list={doneList}
                    />
                  )}
                </Draggable>
              ))}
          {loading && [1, 2, 3, 4].map((item) => <SkeletonCard key={item} />)}
          {provided.placeholder}
        </div>
      }
    </div>
  );
};

export default React.memo(Done);
