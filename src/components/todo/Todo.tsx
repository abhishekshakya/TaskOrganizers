import React from "react";
import { Card } from "../card/Card";
import "./Todo.css";
import dnd, { Draggable, DroppableStateSnapshot } from "react-beautiful-dnd";
import { Add, Sort } from "@material-ui/icons";
import image from "../../146.jpg";

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

  const sortHandler = () => {
    setList((p) => [...p.sort((a, b) => b.Priority - a.Priority)]);
    // console.log("GGGG");
  };
  // console.log(todoList);

  const addHandler = () => {
    const temp: data = {
      Title: "Add Your Title",
      Description: "Task Description",
      Priority: 0,
      Key: (todoList ? todoList.length + 1 : 100).toString(),
      Status: 0,
    };
    setList((p) => [temp, ...p]);
    // let elem = document.getElementsByClassName("card");
    // elem[0].classList.add("cardAnimation");

    // setTimeout(() => {
    //   elem[0].classList.remove("cardAnimation");
    // }, 0);

    // console.log(todoList?.length);
  };

  return (
    <div
      className="todo"
      style={{ backgroundColor: snapshot.isDraggingOver ? "#a7deab" : "" }}
    >
      <p className="todo__title">Tasks</p>
      <div className="todo__sort">
        <Sort style={{ color: "white" }} onClick={sortHandler} />
      </div>
      <div className="todo__add">
        <Add style={{ color: "white" }} onClick={addHandler} />
      </div>

      <div
        className="todo__cards"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {!todoList || todoList.length === 0 ? (
          <div className="imageContainer">
            <img src={image} />
          </div>
        ) : (
          todoList.map((item, index) => (
            <Draggable draggableId={item.Key} index={index} key={item.Key}>
              {(provide, snapshott) => (
                <Card
                  provided={provide}
                  snapshot={snapshott}
                  data={item}
                  setList={setList}
                  list={todoList}
                />
              )}
            </Draggable>
          ))
        )}

        {provided.placeholder}
      </div>
    </div>
  );
};

export default React.memo(Todo);
