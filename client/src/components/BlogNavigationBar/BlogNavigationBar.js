import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut, selectUserData } from "../../features/user/userSlice";
import "./BlogNavigationBar.css";

export default function BlogNavigationBar(props) {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const history = useHistory();

  async function submitLogout(event) {
    try {
        const response = await fetch('/api/account/logout/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        // if the response is okay, then signout and redirect
        if (response.ok === true) {
            dispatch(logOut())
            history.push('/')
            return
        }
        // if not, stop redirect and flash an error
        alert('There was an error, please try again')
        event.preventDefault();
    } catch (error) {
      console.log(error)
      event.preventDefault();
    }  
}

  

  return (
    <nav>
      <header>
        <h1>Historical Figure Blog</h1>
      </header>
      <ul>
          <li><Link to="/blog/">Home</Link></li>
          <li style={{display: userData.admin ? "block" : "none"}}><Link to="/blog/new/">New</Link></li>
          <li><Link to="/blog/about/">About</Link></li>
          <li>User: <strong>{userData.username}</strong></li>
          <li><button className="choiceButton" onClick={submitLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}
