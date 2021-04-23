import { Button } from "@material-ui/core";
import React from "react";
import "./Header.css";
import firebase from "../../firebase";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const logoutHandler = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="header">
      <p>Heading Navigation</p>
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={logoutHandler}
      >
        Log out
      </Button>
    </div>
  );
};
