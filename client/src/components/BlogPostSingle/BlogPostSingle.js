import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getAllPosts,
  getBlogComments,
  selectBlogComments,
  selectBlogCommentStatus,
  selectSingleBlogPost,
  selectBlogStatus,
  selectBlogCommentError,
} from "../../features/blog/blogSlice";

import gfm from "remark-gfm";

import BlogPostCommentList from "../BlogPostCommentList/BlogPostCommentList";
import Reactions from "../BlogReactions/Reactions";
import BlogReply from "../BlogReply/BlogReply";
import BlogTags from "../BlogTags.js/BlogTags";

import "./BlogPostSingle.css";

import ReactMarkdown from "react-markdown";
import BlogPostHeader from "../BlogPostHeader/BlogPostHeader";
import BlogPostEdit from "../BlogPostEdit/BlogPostEdit";
import { selectUserData } from "../../features/user/userSlice";
import Error from "../Error/Error";

export default function BlogPostSingle(props) {
  const dispatch = useDispatch();
  const blogPostId = parseInt(useParams().blogPostId);
  const [edit, setEdit] = useState(false);
  const userData = useSelector(selectUserData);

  const reactMarkdownSettings = { h1: "h3", h2: "h4", h3: "h5", h4: "h6" };

  function toggleEdit() {
    if (edit === true) {
      setEdit(false);
    } else if (edit === false) {
      setEdit(true);
    }
  }

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getBlogComments(blogPostId));
  }, [blogPostId, dispatch]);

  const commentStatus = useSelector(selectBlogCommentStatus);
  const blogStatus = useSelector(selectBlogStatus);
  const blogPost = useSelector((state) =>
    selectSingleBlogPost(state, blogPostId)
  );
  const blogComments = useSelector(selectBlogComments);
  const blogCommentError = useSelector(selectBlogCommentError);

  // filled depending on if there is content
  let content;
  let comments;

  // Here we deal with the comments
  if (commentStatus === "loading") {
    comments = <p>Loading comments...</p>;
  } else if (commentStatus === "success") {
    comments = <BlogPostCommentList comments={blogComments} parent={null} />;
  } else {
    comments = <p>Loading of comments failed :(</p>;
  }

  // here we deal with the content
  if (blogStatus === "loading") {
    content = (
      <article>
        <p>Blog post loading...</p>
      </article>
    );
  } else if (
    blogStatus === "success" &&
    blogPost !== undefined &&
    edit === false
  ) {
    content = (
      <article>
        <BlogPostHeader blogPost={blogPost} />
        <BlogTags tags={blogPost.tags} />
        <div className="BlogContent">
          <p
            className="BlogCommentEditItem"
            onClick={() => setEdit(true)}
            style={{
              display:
                userData.admin && userData.id === blogPost.author_id
                  ? "block"
                  : "none",
            }}
          >
            Edit
          </p>
          <div className="BlogContentText">
            <ReactMarkdown
              remarkPlugins={[gfm]}
              components={reactMarkdownSettings}
            >
              {blogPost.content}
            </ReactMarkdown>
          </div>
          <Reactions reactions={blogPost.reactions} blogId={blogPost.id} />
          <BlogReply parentCommentId={null} targetId={blogPost.id} />
        </div>
        {comments}
      </article>
    );
  } else if (
    blogStatus === "success" &&
    blogPost !== undefined &&
    edit === true
  ) {
    // this pretends to be the content above but with forms to fill
    content = (
      <BlogPostEdit
        blogPost={blogPost}
        comments={comments}
        toggleEdit={toggleEdit}
      />
    );
  } else if (blogCommentError) {
    content = <Error />;
  } else {
    content = (
      <article className="BlogContent">
        <p>Here should be a single blog post</p>
        <p>Loading failed, however</p>
      </article>
    );
  }

  return content;
}
