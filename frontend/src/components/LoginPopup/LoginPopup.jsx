import React,{ useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
    // role: "user" // <-- add role to state
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({
      ...data,
      [name]: value
    }));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    }
    else {
      newUrl += "/api/user/register";
    }

    // Send role to backend
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);

      // Redirect based on role
      // if (data.role === "admin") {
      //   window.location.href = "/admin";
      // } else {
        window.location.href = "/";
      // }
    }
    else {
      alert(response.data.message || "An error occurred. Please try again.");
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {/* Role selector */}
            {/* <select name="role" value={data.role} onChange={onChangeHandler} className="login-popup-role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select> */}
            {currState === "Login" ? <></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required/>}
            <input name ='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='your password' required/>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
         ?<p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
         : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup