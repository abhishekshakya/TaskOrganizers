import React, { useState } from "react";
import "./App.css";
import Doing from "./components/doing/Doing";
import Done from "./components/done/Done";
import { Header } from "./components/header/Header";
import Todo from "./components/todo/Todo";
import { todoData } from "./Data/todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dnd from "react-beautiful-dnd";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState(
    todoData.filter((item) => item.Status === 0)
  );
  const [doing, setDoing] = useState(
    todoData.filter((item) => item.Status === 1)
  );
  const [done, setDone] = useState(
    todoData.filter((item) => item.Status === 2)
  );

  const dragEnd = (result: dnd.DropResult) => {
    // console.log("Result");
    if (!result.destination) return;
    const sourceId = result.source.droppableId;
    const sourceIndex = result.source.index;

    const destinationId = result.destination.droppableId;
    const destinationIndex = result.destination.index;

    let todoTemp = [...todo];
    let doingTemp = [...doing];
    let doneTemp = [...done];

    let tempItem: data | undefined = undefined;

    if (sourceId === "todo") {
      [tempItem] = todoTemp.splice(sourceIndex, 1);
      setTodo([...todoTemp]);
    } else if (sourceId === "doing") {
      [tempItem] = doingTemp.splice(sourceIndex, 1);
      setDoing([...doingTemp]);
    } else {
      [tempItem] = doneTemp.splice(sourceIndex, 1);
      setDone([...doneTemp]);
    }

    if (destinationId === "todo") {
      todoTemp.splice(destinationIndex, 0, tempItem);
      setTodo([...todoTemp]);
    } else if (destinationId === "doing") {
      doingTemp.splice(destinationIndex, 0, tempItem);
      setDoing([...doingTemp]);
    } else {
      doneTemp.splice(destinationIndex, 0, tempItem);
      setDone([...doneTemp]);
    }
    console.log(result);
  };

  return (
    <div className="App">
      <Header />
      <div className="App__body">
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <Todo
                provided={provided}
                snapshot={snapshot}
                todoList={todo}
                setList={setTodo}
              />
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided, snapshot) => (
              <Doing
                snapshot={snapshot}
                provided={provided}
                doneList={doing}
                setList={setDoing}
              />
            )}
          </Droppable>

          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <Done
                snapshot={snapshot}
                provided={provided}
                doneList={done}
                setList={setDone}
              />
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
