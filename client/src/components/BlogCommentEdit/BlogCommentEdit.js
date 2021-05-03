import React, { useEffect, useState } from "react";
import "./BlogCommentEdit.css";
import { useParams } from "react-router-dom";
import { removeComment, changeComment, addReport } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../TextEditor/TextEditor";
import ReactMarkdown from "react-markdown";
import { selectUserData } from "../../features/user/userSlice";

export default function BlogCommentEdit(props) {
  const [showEdit, setShowEdit] = useState("none");
  const [showReport, setShowReport] = useState("block");
  const [showEditForm, setShowEditForm] = useState("none");
  const [showReportForm, setShowReportForm] = useState("none");
  const dispatch = useDispatch();

  let blogId = parseInt(useParams().blogPostId);

  // get the userId from the state
  const userId = useSelector(selectUserData).id;

  //if you're logged in, you can edit your comments, otherwise you can just report them
  useEffect(() => {
    if (props.authorId === userId) {
      setShowEdit("block");
      setShowReport("none");
    } else {
      setShowEdit("none");
      setShowReport("block");
    }
  }, [props.authorId, userId]);

  // this function edits the comment on the server
  async function editCommentOnServer(data = {}) {
    const response = await fetch(`/api/blog/${blogId}/comment/edit`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  // this function deletes the comment from the server
  async function deleteCommentFromServer(data = {}) {
    const response = await fetch(`/api/blog/${blogId}/comment/delete`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  // this function asks via window.confirm if the user wants to delete its comment. if they agree, it tries to remove from server and then removes from Redux
  function deleteComment(event) {
    event.preventDefault();
    let result = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (result) {
      try {
        deleteCommentFromServer({
          commentId: props.commentId,
          userId: userId
        });
        dispatch(removeComment(props.commentId));
      } catch {
        window.alert(
          "Sorry, comment could not be deleted. Please try again later"
        );
      }
    } else {
      return;
    }
  }

  // this function asks if a user is finished editing their comment, then passes to server then updates Redux
  function editComment(event) {
    event.preventDefault();
    let result = window.confirm("Are you finished editing this comment?");
    // we get the comment from the text field
    const newComment = document.getElementById(`edit${props.commentId}`).value;
    if (result) {
      if (props.content === newComment) {
        toggleShowEditForm();
        return;
      }
      try {
        editCommentOnServer({
          commentId: props.commentId,
          newComment: newComment,
          userId: userId
        });
        dispatch(
          changeComment({
            commentId: props.commentId,
            newComment: newComment,
          })
        );
        toggleShowEditForm();
      } catch {
        window.alert(
          "Sorry, comment could not be edited. Please try again later"
        );
      }
    } else {
      return;
    }
  }

  function toggleShowEditForm(event) {
    if (showEditForm === "none") {
      setShowEditForm("flex");
      setShowEdit("none");
    } else {
      setShowEditForm("none");
      setShowEdit("block");
    }
  }

  // this function reports a comment to the server
  async function submitReportToServer(data = {}) {
    const response = await fetch(`/api/blog/${blogId}/comment/report`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  function reportComment(event) {
    event.preventDefault();
    const result = window.confirm("Are sure you want to report this comment?");
    // we get the report from the form field
    const reportType = document.querySelector(
      `input[name=radio${props.commentId}]:checked`
    ).value;
    const reportText = document.getElementById(`radio${props.commentId}reason`)
      .value;
    if (result) {
      try {
        submitReportToServer({
          reportType: reportType,
          reportText: reportText,
          commentId: props.commentId,
          userId: userId,
        });
        dispatch(addReport({commentId: props.commentId}))
        window.alert(
          "Report successful, thanks for helping to improve the experience :)"
        );
        toggleShowReportForm();
      } catch {
        window.alert(
          "Sorry, comment could not be reported. Please try again later"
        );
      }
    } else {
      return;
    }
  }

  function toggleShowReportForm() {
    if (showReportForm === "none") {
      setShowReportForm("block");
      setShowReport("none");
    } else {
      setShowReportForm("none");
      setShowReport("block");
    }
  }

  return (
    <React.Fragment>
      <div
        className="BlogCommentEditFormContainer"
        style={{ display: showEditForm }}
      >
        <form className="BlogCommentEditForm" id={`editing${props.commentId}`}>
          <TextEditor targetId={`edit${props.commentId}`} value={props.content} />
        </form>
        <div className="ButtonContainer">
          <button className="choiceButton" onClick={toggleShowEditForm}>Cancel</button>
          <button className="choiceButton" onClick={editComment}>Save</button>
        </div>
      </div>
      <ul className="BlogCommentEdit">
        <li
          className="BlogCommentEditItem"
          style={{ display: showEdit }}
          onClick={toggleShowEditForm}
        >
          Edit
        </li>
        <li
          className="BlogCommentEditItem"
          style={{ display: showEdit }}
          onClick={deleteComment}
        >
          Delete
        </li>
        <li
          className="BlogCommentEditItem"
          style={{ display: showReport }}
          onClick={toggleShowReportForm}
        >
          Report
        </li>
        <li>
          <div
            className="BlogCommentReportFormContainer"
            style={{ display: showReportForm }}
          >
            <h3>Report</h3>
            <form
              className="BlogCommentReportForm"
              id={`BlogCommentReportForm${props.commentId}`}
              onSubmit={reportComment}
            >
            <fieldset>
              <legend>Comment</legend>
            <h5 className="blogCommentUser">{props.user}</h5>
            <ReactMarkdown>{props.content}</ReactMarkdown>
            </fieldset>
              <label htmlFor={`radio${props.commentId}`}><strong>Type</strong></label>
              <div
                className="RadioButtonContainer"
                id={`radio${props.commentId}`}
              >
                <div className="RadioButtonItem">
                  <input
                    type="radio"
                    id={`radio${props.commentId}spam`}
                    name={`radio${props.commentId}`}
                    required
                    value="Spam"
                  />
                  <label htmlFor={`radio${props.commentId}spam`}>Spam</label>
                </div>
                <div className="RadioButtonItem">
                  <input
                    type="radio"
                    id={`radio${props.commentId}falseinfo`}
                    name={`radio${props.commentId}`}
                    required
                    value="False Information"
                  />
                  <label htmlFor={`radio${props.commentId}falseinfo`}>
                    False Information
                  </label>
                </div>
                <div className="RadioButtonItem">
                  <input
                    type="radio"
                    required
                    id={`radio${props.commentId}harassment`}
                    name={`radio${props.commentId}`}
                    value="Harassment"
                  />
                  <label htmlFor={`radio${props.commentId}harassment`}>
                    Harassment
                  </label>
                </div>
                <div className="RadioButtonItem">
                  <input
                    type="radio"
                    required
                    id={`radio${props.commentId}other`}
                    name={`radio${props.commentId}`}
                    value="Other"
                  />
                  <label htmlFor={`radio${props.commentId}other`}>Other</label>
                </div>
              </div>
              <div className="FormItem">
                <label htmlFor={`radio${props.commentId}reason`}><strong>Comment</strong></label>
                <textarea
                  placeholder="The reason for your report"
                  type="text"
                  id={`radio${props.commentId}reason`}
                  required
                ></textarea>
              </div>
              <div className="FormItem" style={{flexDirection: "row"}}>
                <button className="choiceButton" onClick={toggleShowReportForm}>Cancel</button>
                <button className="choiceButton">Submit</button>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
}
