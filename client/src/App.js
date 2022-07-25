import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import React from "react";
import {
  BrowserRouter ,
  Routes,
  Route

} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/profile/:username" element={<Profile/>}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
