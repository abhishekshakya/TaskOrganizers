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
}

const Colors = ["#3977eb", "#ffe600", "#f03616"];

interface CardProps {
  data: data;
  setList: React.Dispatch<React.SetStateAction<data[]>>;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export const Card: React.FC<CardProps> = ({
  data,
  setList,
  provided,
  snapshot,
}) => {
  const [click, setClick] = useState(false);
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState(data.Title);
  const [desc, setDesc] = useState(data.Description);

  const closeHandler = (key: string) => {
    setList((p) => p.filter((item) => item.Key !== key));
  };

  const editHandler = (key: string) => {
    setEdit(true);
  };

  const descHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "5px";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setDesc(e.target.value);
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
          <IconButton style={{ padding: 7 }} onClick={(e) => setEdit(false)}>
            <Done style={{ fontSize: 20, color: "#7f61b3" }} />
          </IconButton>
        ) : (
          <IconButton
            style={{ padding: 7 }}
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="card__edesc"
            value={desc}
            onChange={descHandler}
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

      {/* <p>{data.Priority}</p> */}
      <div
        className="card__line"
        style={{
          backgroundColor: Colors[data.Priority],
          boxShadow: `0px 0px 8px -1px ${Colors[data.Priority]}`,
        }}
      />
    </div>
  );
  // return (
  //   <div
  //     {...provided.dragHandleProps}
  //     {...provided.draggableProps}
  //     ref={provided.innerRef}
  //     className="card"
  //     style={edit ? { borderTop: "4px solid #9473ce" } : undefined}
  //   >
  //     oioioioi
  //   </div>
  // );
};
