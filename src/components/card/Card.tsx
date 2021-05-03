import { IconButton } from "@material-ui/core";
import { Close, Done, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import "./Card.css";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
  Edit: boolean;
}

const Colors = ["#3977eb", "#ffe600", "#f03616"];

interface CardProps {
  data: data;
  setList: React.Dispatch<React.SetStateAction<data[]>>;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  list: data[];
}

export const Card: React.FC<CardProps> = ({
  data,
  setList,
  provided,
  snapshot,
  list,
}) => {
  const [click, setClick] = useState(false);
  const [edit, setEdit] = useState(data.Edit);

  const [title, setTitle] = useState(data.Title);
  const [desc, setDesc] = useState(data.Description);
  const [priority, setPriority] = useState(data.Priority);

  const closeHandler = (key: string) => {
    setList((p) => p.filter((item) => item.Key !== key));
  };

  const editHandler = (key: string) => {
    let temp = list.map((item) => {
      if (item.Key !== key) {
        return item;
      } else {
        return {
          ...item,
          Edit: true,
        };
      }
    });
    // let element = { ...list.filter((item) => item.Key === key)[0], Edit: true };
    // setList((p) => [...p, element]);
    setList([...temp]);
    setEdit(true);
  };

  const descHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "5px";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setDesc(e.target.value);
  };

  const priorityHandler = () => {
    setPriority((p) => (p + 1) % 3);
  };

  const applyEditHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let temp = list.map((item) => {
      if (item.Key !== data.Key) {
        return item;
      } else {
        if (!desc) {
          setDesc("Added Description");
        }
        if (!title) {
          setTitle("New Title");
        }
        return {
          Description: desc.length !== 0 ? desc : "Added Description",
          Priority: priority,
          Title: title.length !== 0 ? title : "New Title",
          Status: item.Status,
          Key: item.Key,
          Edit: false,
        };
      }
    });

    setList([...temp]);
    setEdit(false);
  };

  return (
    <div
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className="card"
      style={{
        borderTop: edit ? "4px solid #9473ce" : undefined,
        ...provided.draggableProps.style,
      }}
    >
      <div className="card__icons">
        {edit ? (
          <IconButton
            style={{ padding: 7, display: data.Status !== 0 ? "none" : "" }}
            onClick={applyEditHandler}
          >
            <Done style={{ fontSize: 20, color: "#7f61b3" }} />
          </IconButton>
        ) : (
          <IconButton
            style={{ padding: 7, display: data.Status !== 0 ? "none" : "" }}
            onClick={(e) => editHandler(data.Key)}
          >
            <Edit style={{ fontSize: 20, color: "#2c2c2c" }} />
          </IconButton>
        )}

        <IconButton
          style={{ padding: 7 }}
          onClick={(e) => closeHandler(data.Key)}
        >
          <Close style={{ fontSize: 20, color: "#2c2c2c" }} />
        </IconButton>
      </div>

      {edit ? (
        <>
          <input
            className="card__etitle"
            value={title}
            placeholder="Add Your Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="card__edesc"
            value={desc}
            onChange={descHandler}
            placeholder="Add Description"
          />

          <div
            className="card__line__input"
            style={{
              backgroundColor: Colors[priority],
              boxShadow: `0px 0px 8px -1px ${Colors[priority]}`,
            }}
            onClick={priorityHandler}
          />
        </>
      ) : (
        <>
          <p className="card__title">{title}</p>
          <p
            className="card__desc"
            onClick={() => setClick((p) => !p)}
            style={click ? { maxHeight: "max-content" } : {}}
          >
            {desc}
          </p>
        </>
      )}
      <div
        className="card__line"
        style={{
          backgroundColor: Colors[priority],
          boxShadow: `0px 0px 8px -1px ${Colors[priority]}`,
        }}
      />
    </div>
  );
};
