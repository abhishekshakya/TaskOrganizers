import React, { useState } from "react";
import "./App.css";
import { Doing } from "./components/doing/Doing";
import { Done } from "./components/done/Done";
import { Header } from "./components/header/Header";
import { Todo } from "./components/todo/Todo";
import { todoData } from "./Data/todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dnd from "react-beautiful-dnd";

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

  const dragEnd = (result: dnd.DropResult) => {};

  return (
    <div className="App">
      <Header />
      <div className="App__body">
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <Todo
                // {...provided.droppableProps}
                provided={provided}
                todoList={todo}
                setList={setTodo}
              />
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided) => (
              <Doing provided={provided} doneList={doing} setList={setDoing} />
            )}
          </Droppable>

          <Droppable droppableId="done">
            {(provided) => (
              <Done provided={provided} doneList={done} setList={setDone} />
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
