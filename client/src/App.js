import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import React, { useContext } from "react";
import {
  BrowserRouter ,
  Routes,
  Route,
  Navigate ,

} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {user}=useContext(AuthContext);
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={user ?<Home/> :<Login/>}> </Route>
      <Route path="/login" element={user ?<Navigate replace to="/" /> :<Login/>}></Route>
      <Route path="/register" element={user ?<Navigate replace to="/" /> :<Register/>}></Route>
      <Route path="/profile/:username" element={<Profile/>}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
