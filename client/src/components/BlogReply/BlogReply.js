import { addComment } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";

import './BlogReply.css'
import TextEditor from "../TextEditor/TextEditor";
import { selectUserData } from "../../features/user/userSlice";

export default function BlogReply(props) {
  const [show, setShow] = useState("none");
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();

  function toggleVisible(event) {
    event.preventDefault();
    if (show === "none") {
      setShow("block");
    } else if (show === "block") {
      setShow("none");
    }
  }
  let blogId = parseInt(useParams().blogPostId);

    // get the userId and userName from the state
    const userId = useSelector(selectUserData).id;

  // this function posts the comment to the server
  async function addCommentToServer(data = {}) {
    const response = await fetch(`/api/blog/${blogId}/comment`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  function submitComment(event) {
    // prevent page refresh
    event.preventDefault();

    // comment we get from the text field
    const comment = document.getElementById(`comment${props.targetId}`).value;

    //try to pass to server and then update the Redux accordingly
    try {
      addCommentToServer({
        authorId: userId,
        commentContent: comment,
        parentCommentId: props.parentCommentId,
      })
        .then((response) => {
          const json = response.json()
          //console.log(json)
          return json
        })
        .then((response) => {
          //console.log(response)
          dispatch(addComment(response))
        });
      // then close the comment box
      toggleVisible(event);
    } catch(error) {
      //console.log(error)
      setServerError(
        "Sorry there was an error posting your comment. Please try again later!"
      );
    }
  }

  return (
    <div className="BlogReply">
      <button className="choiceButton" onClick={toggleVisible} disabled={props.disabled ? true : false} style={{ display: (show === "none" ? "block" : "none" )}}>
        Reply
      </button>
      <form
        style={{ display: show }}
        onSubmit={submitComment}
        id={`replyTo${props.targetId}`}
      >
        <TextEditor targetId={`comment${props.targetId}`} heightInRem="5"/>
        <button className="choiceButton" onClick={toggleVisible}>Cancel</button><button className="choiceButton" type="submit">Submit</button> 
        <p>{serverError}</p>
      </form>
    </div>
  );
}
