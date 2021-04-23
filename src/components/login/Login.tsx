import { Button } from "@material-ui/core";
import { error } from "node:console";
import React from "react";
import firebase from "../../firebase";
import "./Login.css";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const clickHandler = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <Button
        variant="contained"
        color="primary"
        style={{ textTransform: "none" }}
        onClick={clickHandler}
      >
        Sign In
      </Button>
    </div>
  );
};
