import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/user/userSlice";
import BlogTime from "../BlogTime/BlogTime";
import "./BlogPostHeader.css";

export default function BlogPostHeader(props) {
  const userData = useSelector(selectUserData);

    let comment = "Comments"
    if (props.blogPost.total_comments === "1") {
        comment = "Comment"
    } 

  const backgroundImageUrl = `url(/api/images/${props.blogPost.image})`
  const blogPostHeaderStyleObject = {
    backgroundImage: backgroundImageUrl,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }

  if (props.firstPost === "true" && props.frontPage === "true") {
    return (
      <header
        className="BlogPostHeader"
        style={blogPostHeaderStyleObject}
      >
        <div className="BlogPostHeaderContent">
          <h2>{props.blogPost.title}</h2>
          <ul className="BlogPostHeaderSubContent">
            <li>by <strong style={{color: userData.id === props.blogPost.author_id ? "blue" : "black"}}>{props.blogPost.username}</strong></li>
            <li>
              <BlogTime date={props.blogPost.date} />
            </li>
            <li>{props.blogPost.total_comments} {comment}</li>
          </ul>
        </div>
        <div className="overlay blue"></div>
      </header>
    );
  } else if (props.frontPage === "true") {
    return (
      <React.Fragment>
        <header
          className="BlogPostHeader"
          style={blogPostHeaderStyleObject}
        >
          <div className="overlay blue"></div>
        </header>
        <div className="BlogPostHeaderContentMini">
          <h2>{props.blogPost.title}</h2>
          <ul className="BlogPostHeaderSubContentMini">
            <li>by <strong style={{color: userData.id === props.blogPost.author_id ? "blue" : "black"}}>{props.blogPost.username}</strong></li>
            <li>
              <BlogTime date={props.blogPost.date} />
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <header
        className="BlogPostHeader"
        style={blogPostHeaderStyleObject}
      >
        <div className="BlogPostHeaderContent">
          <h2>{props.blogPost.title}</h2>
          <ul className="BlogPostHeaderSubContent">
            <li>by <strong style={{color: userData.id === props.blogPost.author_id ? "blue" : "black"}}>{props.blogPost.username}</strong></li>
            <li>
              <BlogTime date={props.blogPost.date} />
            </li>
            <li>{props.blogPost.total_comments} {comment}</li>
          </ul>
        </div>
        <div className="overlay blue"></div>
      </header>
    );
  }
}
