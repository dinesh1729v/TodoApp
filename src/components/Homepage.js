import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { child, get } from "firebase/database";


import Header from "./Header.js";
import Footer from "./Footer.js";

import "./homepage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';

export default function Homepage() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      description: description,
      category: category,
      date: date,
      uidd: uidd
    });

    setTodo("");
    setDescription("");
    setCategory("");
    setDate("");
  };


  const [dbvals, setDbVals] = useState(""); 

const getTodoByUidd = async (uidd) => {
  console.log("GetTODOByUidd");
  const snapshot = await get(child(ref(db), `${auth.currentUser.uid}/${uidd}`));
  if (snapshot.exists()) {
    console.log("Success")
    setDbVals(snapshot.val());
    return snapshot.val();
  } else {
    console.log("Hello");
    return null;
  }
};

const handleUpdate = async (uid) => {
  setIsEdit(true);
  const dbVals = await getTodoByUidd(uid);
  
  if(dbVals && dbVals.uidd && dbvals.description && dbvals.category && dbvals.date) {
    console.log(dbvals);
    setTodo(dbVals.todo);
    setDescription(dbVals.description);
    setCategory(dbVals.category);
    setDate(dbVals.date);
    setTempUidd(dbvals.uidd);
  }
};

  const handleEditConfirm = () => {

    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      description: description,
      category: category,
      date: date,
      tempUidd: tempUidd
    });

    setTodo("");
    setDescription("")
    setCategory("")
    setDate("")
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    console.log(uid);
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <><div className="header">
      <Header />
    </div><div className="homepage">


        <div className="add-container">
          <input
            className="add-edit-input"
            type="text"
            placeholder="Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)} />

          <input
            className="add-edit-input"
            type="text"
            placeholder="Add todo Name..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)} />

          <input
            className="add-edit-input"
            type="text"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <input
            className="add-edit-input"
            type="date"
            placeholder="Date..."
            value={date}
            onChange={(e) => setDate(e.target.value)} />
          {isEdit ? (
            <div>
              <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon" />
            </div>
          ) : (
            <div className="confirm-icon">
              <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
            </div>
          )}
        </div>

        {todos.map((todo) => (
          <div className="todo">

            <h1>{todo.todo}</h1>
            {/* <h1>{description.description}</h1> */}

            <EditIcon
              fontSize="large"
              onClick={() => handleUpdate(todo.uidd)}
              className="edit-button" />
            <DeleteIcon
              fontSize="large"
              onClick={() => handleDelete(todo.uidd)}
              className="delete-button" />
          </div>
        ))}


        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
        <div className="bottom-container">
        <Footer />
        </div>
      </div></>
  );
}
