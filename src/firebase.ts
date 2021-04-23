import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA-1r6u1cMpGYZLu9i4Gh5TcyroFp6rqXs",
  authDomain: "taskorganizer-926b7.firebaseapp.com",
  projectId: "taskorganizer-926b7",
  storageBucket: "taskorganizer-926b7.appspot.com",
  messagingSenderId: "876897729430",
  appId: "1:876897729430:web:732d62158ba6fc13f63bb7",
};
firebase.initializeApp(firebaseConfig);

export default firebase;

/*
users-
    user(id)
        -board1(id)
        -board2(id)
    user2(id)
        -board1(id)
    user3(id)
        -board1(id)


boards-
    board(id)
        -todo
        -doing
        -done

*/
