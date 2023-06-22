import React from "react";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Setavatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/setavatar" element={<Setavatar/>}></Route>
      <Route path="/" element={<Chat/>}></Route>
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
