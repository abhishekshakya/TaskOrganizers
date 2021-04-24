import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Login } from "./components/login/Login";
import firebase from "./firebase";

const Listener: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/organizer/1");
      } else {
        history.push("/login");
      }
    });
    return () => listener();
  }, []);
  return <></>;
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Listener />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/organizer/:id" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
