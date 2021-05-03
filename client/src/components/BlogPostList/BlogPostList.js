import BlogPostPreview from "../BlogPostPreview/BlogPostPreview";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBlogStatus,
  selectAllBlogPosts,
  getAllPosts,
  selectBlogPostsByTag,
  selectAllTags,
} from "../../features/blog/blogSlice";

import './BlogPostList.css'

import { getUniqueTags } from "./getUniqueTags";
import BlogTags from "../BlogTags.js/BlogTags";

export default function BlogPostList() {
  const dispatch = useDispatch();
  const status = useSelector(selectBlogStatus);
  const [tag, setTag] = useState("none");

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  let blogPosts = useSelector(selectAllBlogPosts);
  const tagPosts = useSelector((state) => selectBlogPostsByTag(state, tag));
  const tags = useSelector(selectAllTags);
  const uniqueTags = getUniqueTags(tags);

  if (tag !== "none") {
    blogPosts = tagPosts;
  }

  function setFilterTag(newTag) {
    setTag(newTag);
  }

  if (status === "loading") {
    return (
      <main className="BlogContent">
        <p>Loading...</p>
      </main>
    );
  } else if (status === "success") {
    return (
      <main>
        <BlogTags
          tags={uniqueTags}
          setFilterTag={setFilterTag}
          setFilter="true"
          mainPage="true"
        />
        <div className="BlogPostGridContainer">
          {blogPosts.map(function(post, index) {
            if (index === 0) {
              return (
              <BlogPostPreview
              data={blogPosts[index]}
              key={blogPosts[index].id}
              setFilterTag={setFilterTag}
              extraClass="firstPost"
            />)
            } else {
              return <BlogPostPreview
              data={blogPosts[index]}
              key={blogPosts[index].id}
              setFilterTag={setFilterTag}
            />
            }
          }
          )}
        </div>
      </main>
    );
  } else {
    return (
      <main className="BlogContent">
        <p>Here should be a list of blog posts</p>
        <p>Loading failed, however</p>
      </main>
    );
  }
}
