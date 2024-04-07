import "./login.css";
import {useContext, useRef} from "react";
import{ loginCall} from "./../apiCalls";
 import {Link} from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const{isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
e.preventDefault();
loginCall({email: email.current.value,password: password.current.value}, dispatch);
  };
  // console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">LetsHang</h3>
            <span className="loginDesc">
                Connect with friends and the world around you..
            </span>
        </div>
        <div className="loginRight">
            <form  className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                <input placeholder="Password" type="password" required minLength ="6" 
                className="loginInput" ref={password} />
                <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? "loading":"Log In"}</button>
                <span className="loginForgot">Forgot Password?</span>
                  <Link to="/register">  
                <button className="loginRegisterButton">Create a New Account</button>
                  </Link>  
            </form>
        </div>
      </div>
    </div>
  );
}

