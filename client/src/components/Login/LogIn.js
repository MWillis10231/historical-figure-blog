import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logIn, selectUserLoggedIn } from "../../features/user/userSlice";
import "./LogIn.css";

export default function LogIn(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector(selectUserLoggedIn);

  // once log-in is successful, redirect to the blog
  useEffect(() => {
    if (loggedIn === true) {
      history.push(`/blog/`);
    }
  }, [history, loggedIn]);

  async function signInOnServer(data = {}) {
    const response = await fetch("/api/account/login/", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: new URLSearchParams(data),
    });
    return response;
  }

  function submitLogIn(event) {
    event.preventDefault();
    try {
      signInOnServer({
        username: document.getElementById("logInUsername").value,
        password: document.getElementById("logInPassword").value,
      }).then((response) =>
        response.json().then((response) => dispatch(logIn(response)))
      );
      event.preventDefault();
    } catch (error) {
      console.log(error);
      event.preventDefault();
    }
  }

  async function signUpOnServer(data = {}) {
    const response = await fetch("/api/account/register/", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: new URLSearchParams(data),
    });
    return response;
  }

  function submitSignUp(event) {
    event.preventDefault();
    try {
      // check if the passwords match
      if (
        document.getElementById("signUpPassword").value ===
        document.getElementById("signUpPasswordrepeat").value
      ) {
      } else {
        throw Error("Please make sure the passwords match");
      }
      // make sure the name/password fields are at least 6 characters
      if (
        document.getElementById("signUpPassword").value.length >= 6 &&
        document.getElementById("signUpUsername").value.length >= 6
      ) {
      } else {
        throw Error(
          "Please make sure the passwords and names are longer than 6 characters"
        );
      }
      let form = document.getElementById("signUp");
      let formData = new FormData(form);
      signUpOnServer(formData)
        .then((response) => {
          if (response.ok) {
            alert("Account created successfully. Logging you in...");
            // Passport not playing ball so workaround
            // Logs them in
            signInOnServer({
              username: document.getElementById("signUpUsername").value,
              password: document.getElementById("signUpPassword").value,
            }).then((response) =>
              response.json().then((response) => dispatch(logIn(response)))
            );
          } else {
            throw new Error(
              "There was an error in your request. Perhaps this username or email is already taken, or the passwords don't match. Please try some other data, or try again later."
            );
          }
        })
        .catch((error) => {
          alert(error);
        });
      event.preventDefault();
    } catch (error) {
      alert(error);
      event.preventDefault();
    }
  }

  return (
    <main className="LogIn">
      <header>
        <h1>Historical Figure Blog</h1>
        <p>
          This is a full-stack blog created by Matthew Willis as part of the
          Codecademy Full-Stack Engineer course.
        </p>
        <p>
          Please log-in or register to view. Most of the current accounts are famous historical figures. Nothing beyond this page should
          be viewable without logging in.
        </p>
        <p>
          If you want to use some dummy accounts, here are a few:
        </p>
        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Password</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JuliusCaesar</td>
              <td>
                <em>brutuswhy</em>
              </td>
            </tr>
            <tr>
              <td>AlbertEinstein</td>
              <td>
                <em>relativity</em>
              </td>
            </tr>
            <tr>
              <td>MarieAntoinette</td>
              <td>
                <em>letthemeatcake</em>
              </td>
            </tr>
            <tr>
              <td>FlorenceNightingale</td>
              <td>
                <em>crimeanwar</em>
              </td>
            </tr>
            <tr>
              <td>MarieCurie</td>
              <td>
                <em>radioactivity</em>
              </td>
            </tr>
            <tr>
              <td>Boudicca</td>
              <td>
                <em>londinium</em>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
      <form id="logIn" name="logIn" onSubmit={submitLogIn}>
        <fieldset>
          <legend>Log In</legend>
          <div className="FormItem">
            <label htmlFor="logInUsername">Username:</label>
            <input
              type="text"
              id="logInUsername"
              name="logInUsername"
              required
            ></input>
            <label htmlFor="logInPassword">Password:</label>
            <input
              type="password"
              id="logInPassword"
              name="logInPassword"
              autoComplete="off"
              required
            ></input>
            <button className="choiceButton" type="submit">Log in</button>
          </div>
        </fieldset>
      </form>
      <p>
        If you do register, please don't use real data. Put something fake in to
        test!
      </p>
      <form id="signUp" name="signUp" onSubmit={submitSignUp}>
        <fieldset>
          <legend>Sign Up</legend>
          <div className="FormItem">
            <label htmlFor="signUpUsername">Username:</label>
            <input
              type="text"
              id="signUpUsername"
              name="signUpUsername"
              autoComplete="off"
              required
              min="6"
            ></input>
          </div>
          <div className="FormItem">
            <label htmlFor="signUpPassword">Password:</label>
            <input
              type="password"
              id="signUpPassword"
              name="signUpPassword"
              autoComplete="off"
              required
              min="6"
            ></input>
          </div>
          <div className="FormItem">
            <label htmlFor="signUpPasswordrepeat">Repeat Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="signUpPasswordrepeat"
              name="signUpPasswordrepeat"
              required
              min="6"
            ></input>
          </div>
          <div className="FormItem">
            <label htmlFor="signUpEmail">Email:</label>
            <input
              type="email"
              autoComplete="off"
              id="signUpEmail"
              name="signUpEmail"
              required
            ></input>
          </div>
          <button className="choiceButton" type="submit">Complete signup</button>
        </fieldset>
      </form>
    </main>
  );
}
