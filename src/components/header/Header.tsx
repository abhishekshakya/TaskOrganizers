import { Button, Modal, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Header.css";
import firebase from "../../firebase";
import icon from "../../icon.jpg";

interface data {
  Title: string;
  Description: string;
  Priority: number;
  Status: number;
  Key: string;
  Edit: boolean;
}

interface HeaderProps {
  saving: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTodo: React.Dispatch<React.SetStateAction<data[]>>;
  setDoing: React.Dispatch<React.SetStateAction<data[]>>;
  setDone: React.Dispatch<React.SetStateAction<data[]>>;
}

export const Header: React.FC<HeaderProps> = ({
  saving,
  setLoading,
  setDone,
  setDoing,
  setTodo,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reset, setReset] = useState(false);
  const [user, setUser] = useState("user");
  const [profile, setProfile] = useState<string>(
    "https://www.pngitem.com/pimgs/m/516-5167304_transparent-background-white-user-icon-png-png-download.png"
  );
  const logoutHandler = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const currentUser = firebase.auth().currentUser;
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      console.log(currentUser.displayName);
      setUser(currentUser.displayName ? currentUser.displayName : "User");
      setProfile(currentUser.photoURL ? currentUser.photoURL : profile);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!reset || !currentUser) {
      return;
    }
    try {
      const resetBoard = async () => {
        setLoading(true);
        setTodo([]);
        setDoing([]);
        setDone([]);
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email as string)
          .set({
            doing: [],
            done: [],
            todo: [],
          });
        setLoading(false);
      };
      resetBoard();
    } catch (e) {
      console.log(e);
    }
  }, [reset, currentUser]);
  // console.log(profile);
  return (
    <>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="imageContainerHeader">
            <img src={profile} />
          </div>
          {saving && <div className="saving" />}
          <p>
            Hello! <b>{user}</b>
          </p>
        </div>
        <Tooltip title="Reset Board">
          <p onClick={() => setShowModal(true)}>Organize your Tasks</p>
        </Tooltip>
        <Button
          variant="contained"
          style={{
            backgroundColor: "white",
            // fontWeight: "bold",
            padding: "3px 7px",
            color: "#ff2d2d",
          }}
          onClick={logoutHandler}
        >
          Log out
        </Button>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="reset__modal">
          <p>
            Do you want to <b>RESET</b> board?
          </p>
          <div className="reset__modal__btns">
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "3px 0" }}
              onClick={() => {
                setReset(true);
                setShowModal(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "3px 0" }}
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
