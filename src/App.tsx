import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import apiService from "./services/apiService";
import SignIn from "./components/SignIn";


const user = {
      username: "sameh13652@gmail.com",
      password: "sameh123"
    }
function App() {

  return (
    <div>
      {/* <NavBar></NavBar> */}
      <Login ></Login>
      {/* <SignIn></SignIn> */}
    </div>
  );
}

export default App;
