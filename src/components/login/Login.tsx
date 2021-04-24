import { Button, CircularProgress } from "@material-ui/core";
import icon from "../../icon.jpg";
import React, { useState } from "react";
import firebase from "../../firebase";
import "./Login.css";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const clickHandler = async () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // console.log(result);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <div className="login">
      <div className="imageContainer__login">
        <img src={icon} />
      </div>
      <p>SignUp/ SignIn with Google</p>
      <Button
        variant="contained"
        color="primary"
        style={{ textTransform: "none" }}
        onClick={clickHandler}
        disabled={loading}
      >
        <div style={{ width: "70px", height: "25px" }}>
          {loading ? (
            <CircularProgress style={{ height: "22px", width: "22px" }} />
          ) : (
            "Sign In"
          )}
        </div>
      </Button>
    </div>
  );
};
