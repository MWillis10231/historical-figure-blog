import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import Reactions from "../BlogReactions/Reactions";
import BlogPostCommentList from "../BlogPostCommentList/BlogPostCommentList";
import "./BlogPostComment.css";
import BlogReply from "../BlogReply/BlogReply";
import BlogTime from "../BlogTime/BlogTime";
import BlogCommentEdit from "../BlogCommentEdit/BlogCommentEdit";
import BlogCommentEditHistory from "../BlogCommentEditHistory/BlogCommentEditHistory";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/user/userSlice";

export default function BlogPostComment(props) {
  const [showEditHistory, setShowEditHistory] = useState("none");
  const [showCommentBody, setShowCommentBody] = useState("block");
  const [showReportedBody, setShowReportedBody] = useState("none");

  function toggleCommentBodyShow() {
    if (showCommentBody === "block") {
      setShowCommentBody("none");
    } else {
      setShowCommentBody("block");
    }
  }

  function toggleReportedCommentBodyShow() {
    if (showReportedBody === "block") {
      setShowReportedBody("none");
    } else {
      setShowReportedBody("block");
    }
  }

  // get the userId from the state
  const userId = useSelector(selectUserData).id;

  // if it's your comment, set appropriate styling
  let userStyle;
  if (props.data.author_id === userId) {
    userStyle = { color: "blue" };
  }

  function revealEditHistory() {
    setShowEditHistory("block");
  }

  function hideEditHistory() {
    setShowEditHistory("none");
  }

  let edited;
  let reported;

  if (props.data.edited === true) {
    edited = (
      <div className="blogCommentEditedContainer">
        <p className="blogCommentEdited tooltip" onClick={revealEditHistory}>
          Edited
          <span className="tooltiptext">View edit history</span>
        </p>
        <BlogCommentEditHistory
          display={showEditHistory}
          history={props.data.history}
          current={props.data.content}
          hideHistory={hideEditHistory}
        />
      </div>
    );
  }

  if (props.data.reported === true) {
    reported = (
      <React.Fragment>
        <p className="blogCommentReported tooltip">
          ⚠️
          <span className="tooltiptextReported">
            A user has reported this post
          </span>
        </p>
      </React.Fragment>
    );
  }

  if (props.data && props.data.deleted === false) {
    return (
      <li className="blogComment">
        <header className="blogCommentHeader">
          <button className="blogCommentExpand" onClick={toggleCommentBodyShow}>
            {showCommentBody === "block" ? "[-]" : "[+]"}
          </button>
          <h5 className="blogCommentUser" style={userStyle}>
            {props.data.username}
          </h5>
          <BlogTime date={props.data.date} />
          {edited}
          {reported}
        </header>
        <div className="blogCommentBody" style={{ display: showCommentBody }}>
          <BlogCommentEdit
            user={props.data.username}
            authorId={props.data.author_id}
            commentId={props.data.id}
            content={props.data.content}
          />
          <ReactMarkdown>{props.data.content}</ReactMarkdown>
          <Reactions
            reactions={props.data.reactions}
            commentId={props.data.id}
          />
          <BlogReply parentCommentId={props.data.id} targetId={props.data.id} />
          <BlogPostCommentList
            comments={props.comments}
            parent={props.data.id}
          />
        </div>
      </li>
    );
  } else if (props.data && props.data.deleted === true) {
    return (
      <li className="blogComment">
        <header className="blogCommentHeaderDeleted">
          <button
            className="blogCommentExpand"
            onClick={toggleReportedCommentBodyShow}
          >
            {showReportedBody === "block" ? "[-]" : "[+]"}
          </button>
          <h5 className="blogCommentUser deleted">deleted</h5>
          <BlogTime date={props.data.date} />
        </header>
        <div className="blogCommentBody" style={{ display: showReportedBody }}>
          <p className="deleted">Deleted</p>
          <Reactions
            reactions={props.data.reactions}
            commentId={props.data.id}
            disabled={true}
          />
          <BlogReply
            parentCommentId={props.data.id}
            targetId={props.data.id}
            disabled={true}
          />
          <BlogPostCommentList
            comments={props.comments}
            parent={props.data.id}
          />
        </div>
      </li>
    );
  } else {
    return null;
  }
}
