import React, { useEffect, useState } from "react";
import "./App.css";
import Doing from "./components/doing/Doing";
import Done from "./components/done/Done";
import { Header } from "./components/header/Header";
import Todo from "./components/todo/Todo";
import { todoData } from "./Data/todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dnd from "react-beautiful-dnd";
import firebase from "./firebase";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
}

// interface board {
//   id: string;
//   name: number;
// }

export const App: React.FC = () => {
  // console.log(props.match.params.id);
  const [todo, setTodo] = useState<data[]>([]);
  // todoData.filter((item) => item.Status === 0)
  const [doing, setDoing] = useState<data[]>([]);
  // todoData.filter((item) => item.Status === 1)
  const [done, setDone] = useState<data[]>([]);
  // todoData.filter((item) => item.Status === 2)
  const [dataLoaded, setDataLoaded] = useState(false);

  const currentUser = firebase.auth().currentUser?.email;

  useEffect(() => {
    if (currentUser) {
      setDataLoaded(false);
      try {
        const fetchData = async () => {
          const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(currentUser)
            .get();
          if (snapshot.data()) {
            setDoing(snapshot.data()?.doing);
            setTodo(snapshot.data()?.todo);
            setDone(snapshot.data()?.done);
          } else {
            await firebase
              .firestore()
              .collection("users")
              .doc(currentUser)
              .set({
                todo: [],
                doing: [],
                done: [],
              });
          }
          setDataLoaded(true);
        };
        console.log("went");
        fetchData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [currentUser]);

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
      tempItem = {
        ...tempItem,
        Status: 0,
      };
      todoTemp.splice(destinationIndex, 0, tempItem);
      setTodo([...todoTemp]);
    } else if (destinationId === "doing") {
      tempItem = {
        ...tempItem,
        Status: 1,
      };
      doingTemp.splice(destinationIndex, 0, tempItem);
      setDoing([...doingTemp]);
    } else {
      tempItem = {
        ...tempItem,
        Status: 2,
      };
      doneTemp.splice(destinationIndex, 0, tempItem);
      setDone([...doneTemp]);
    }
    // console.log(tempItem);
    // console.log(result);
  };

  useEffect(() => {
    // console.log("harm");
    if (currentUser && dataLoaded) {
      const fetchData = async () => {
        try {
          // console.log(todo);
          await firebase
            .firestore()
            .collection("users")
            .doc(currentUser)
            .update({
              todo,
            });
          console.log("updated..todo");
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, [todo, currentUser, dataLoaded]);

  useEffect(() => {
    // console.log("harm");
    if (currentUser && dataLoaded) {
      const fetchData = async () => {
        try {
          // console.log(todo);
          await firebase
            .firestore()
            .collection("users")
            .doc(currentUser)
            .update({
              doing,
            });
          console.log("updated... doing");
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, [doing, currentUser, dataLoaded]);

  useEffect(() => {
    // console.log("harm");
    if (currentUser && dataLoaded) {
      const fetchData = async () => {
        try {
          // console.log(todo);
          await firebase
            .firestore()
            .collection("users")
            .doc(currentUser)
            .update({
              done,
            });
          console.log("updated... done");
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, [done, currentUser, dataLoaded]);

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
