import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Header.css";
import firebase from "../../firebase";
import icon from "../../icon.jpg";

interface HeaderProps {
  saving: boolean;
}

export const Header: React.FC<HeaderProps> = ({ saving }) => {
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
  console.log(profile);
  return (
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
      <p>Organize your Tasks</p>
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
  );
};
