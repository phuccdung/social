import "./login.css";
import {useRef,useContext } from "react";
import {loginCall} from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {

  const email=useRef();
  const password=useRef();
  const {user,isFecthing,error,dispatch}=useContext(AuthContext)
  const handleClick = (e)=>{
    e.preventDefault();
    loginCall(
      {email:email.current.value,password:password.current.value},
      dispatch)
      };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="loginInput" ref={email} />
            <input placeholder="Password" type="password"required minLength="6"  className="loginInput" ref={password}/>
            <button className="loginButton" onSubmit disabled={isFecthing}> {isFecthing? "Loading...":"Login"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" type="submit">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
