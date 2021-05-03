import { useEffect, useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import "./BlogPostCreate.css";

import { format, add, formatISO } from "date-fns";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import BlogPostHeader from "../BlogPostHeader/BlogPostHeader";
import BlogTags from "../BlogTags.js/BlogTags";
import ReactMarkdown from "react-markdown";
import ImageList from "../ImageList/ImageList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/user/userSlice";

import gfm from "remark-gfm";

export default function BlogPostCreate(props) {
  let match = useRouteMatch();
  let history = useHistory();
  const reactMarkdownSettings = { h1: "h3", h2: "h4", h3: "h5", h4: "h6" }

  // go forward to the preview
  function navigateToPost() {
    history.push(`${match.url}preview/`);
  }

  // go back to the editing
  function navigateBackToEdit() {
    history.push(`${match.url}/`);
  }

  // sort out some of the horrible date formatting
  const dateObject = new Date();
  const theDate = format(dateObject, "yyyy-MM-dd");
  const theTime = format(dateObject, "HH:mm:ss");
  const timeInAnHour = format(
    add(dateObject, { hours: 1, minutes: 5 }),
    "HH:mm:ss"
  );

  // this is the preview object and what gets sent to the server
  const [blogPostPreview, setBlogPostPreview] = useState({})

  // lots of state set up, some to handle input forms for editing, others for time
  const [postTime, setPostTime] = useState("now");
  const [futurePost, setFuturePost] = useState("none");
  const [timeValue, setTimeValue] = useState(timeInAnHour);
  const [dateValue, setDateValue] = useState(theDate);
  const [title, setTitle] = useState(blogPostPreview.blogTitle ? blogPostPreview.blogTitle : "");
  const [image, setImage] = useState(blogPostPreview.blogImage ? blogPostPreview.blogImage : "");
  const [content, setContent] = useState(blogPostPreview.blogContent ? blogPostPreview.blogContent : "")
  const [tags, setTags] = useState(blogPostPreview.blogTags ? blogPostPreview.blogTags : "")

  // function to pass down to the text editor to set the content so it persists on editing
  function alterContent(content) {
    setContent(content)
  }

  // function to pass down to the Image List to set the content so it persists on editing
  function alterImage(image) {
    setImage(image)
  }

  // get the userId and userName from the state
   const userId = useSelector(selectUserData).id;
    const userName = useSelector(selectUserData).username;

  // if you're posting now or in the future
  useEffect(() => {
    if (postTime === "now") {
      setFuturePost("none");
      setTimeValue(timeInAnHour);
      setDateValue(theDate);
    } else if (postTime === "future") {
      setFuturePost("flex");
    }
  }, [theDate, postTime, timeInAnHour]);

  // this function adds the blog post to the server
  async function postBlogToServer(data = {}) {
    const response = await fetch(`/api/blog/admin/create`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  function submitBlog(event) {
    // prevent page refresh
    event.preventDefault();

    // title, image & content we get from the text fields
    const blogTitle = document.getElementById("newPostTitle").value;
    const blogContent = document.getElementById("NewPostContent").value;
    const blogImage = document.getElementById("newPostImage").value;

    //console.log(blogTitle);
    //console.log(blogContent);

    //tags we get by separating the input by commas
    const tags = document.getElementById("newPostTags").value;
    const tagArray = tags.split(",");
    const tagsReduced = tagArray.slice(0, 3);

    //console.log(tags);
    //console.log(tagArray);
    //console.log(tagsReduced);

    // format the date object if there is one

    let blogDate;
    if (postTime === "now") {
      blogDate = "now";
    } else if (postTime === "future") {
      const blogPostTime = document.getElementById("newPostTime").value;
      const blogPostDate = document.getElementById("newPostDate").value;
      blogDate = formatISO(new Date(blogPostDate + "," + blogPostTime));
    }
    //console.log(blogDate);

    // set the blogPost object
    setBlogPostPreview({
      username: userName,
      authorId: userId,
      blogTitle: blogTitle,
      blogTags: tagsReduced,
      blogContent: blogContent,
      blogPostDate: blogDate,
      blogImage: blogImage,
    });
    
    navigateToPost();
  }

  // once preview is up and approved, this sends it to the server
  function approveBlog() {
    try {
      postBlogToServer(blogPostPreview)
    history.push(`${match.url}/success/`);
    } catch {
    history.push(`${match.url}/fail/`);
    }
    
  }

  return (
    <Switch>
      <Route path={`${match.url}/`} exact>
        <main className="newBlogPostContainer">
          <h2>Create new blog post</h2>
          <form id="newBlogPost" onSubmit={submitBlog}>
            <fieldset>
              <legend>
                <h3>Title</h3>
              </legend>
              <div className="FormItem">
                <label htmlFor="newPostTitle">Enter the blog post title:</label>
                <input
                  type="text"
                  name="newPostTitle"
                  id="newPostTitle"
                  size="50"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <h3>Image</h3>
              </legend>
              <div className="FormItem">
                <ImageList 
                targetId="newPostImage"
                value={image}
                alterImage={alterImage}/>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <h3>Content</h3>
              </legend>
              <TextEditor
                targetId="NewPostContent"
                heightInRem="20"
                blog="true"
                value={content}
                alterContent={alterContent}
              />
            </fieldset>
            <fieldset>
              <legend>
                <h3>Tags</h3>
              </legend>
              <p>Separate up to three tags with commas (no spaces).</p>
              <div className="FormItem">
                <label htmlFor="newPostTags">Tags</label>
                <input 
                type="text" 
                name="newPostTags" 
                id="newPostTags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}></input>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <h3>Publish</h3>
              </legend>
              <div className="BlogPostCreateScheduleTime">
                <div className="FormItem">
                  <label htmlFor="now">Publish now or in future?</label>
                  <select
                    name="now"
                    id="newPostScheduleTime"
                    onChange={(e) => setPostTime(e.target.value)}
                    required
                  >
                    <option value="now">Now</option>
                    <option value="future">Future</option>
                  </select>
                </div>
                <div
                  className="FormItem BlogPostCreateDateTime"
                  style={{ display: futurePost }}
                >
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="newPostDate"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    min={theDate}
                    disabled={postTime === "now" ? true : false}
                  ></input>
                </div>
                <div
                  className="FormItem BlogPostCreateDateTime"
                  style={{ display: futurePost }}
                >
                  <label htmlFor="date">Time</label>
                  <input
                    type="time"
                    name="time"
                    id="newPostTime"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    min={theDate === dateValue ? theTime : "00:00:00"}
                    disabled={postTime === "now" ? true : false}
                    step="any"
                  ></input>
                </div>
              </div>
            </fieldset>
            <div className="FormItem">
              <button type="submit" className="choiceButton">Publish</button>
            </div>
          </form>
        </main>
      </Route>
      <Route path={`${match.url}/preview/`} exact>
        <article className="newBlogPostContainer">
          <BlogPostHeader
            blogPost={{
              date: formatISO(new Date(dateValue + "," + timeValue)),
              title: blogPostPreview.blogTitle,
              username: blogPostPreview.username,
              image: blogPostPreview.blogImage,
              total_comments: 0,
            }}
          />
          <BlogTags tags={blogPostPreview.blogTags} />
          <p className="BlogContentText">
            <ReactMarkdown remarkPlugins={[gfm]}
          components={reactMarkdownSettings}>{blogPostPreview.blogContent}</ReactMarkdown>
          </p>
          <div>
          <Link to="/blog/"><button className="choiceButton">Cancel</button></Link>
          <button className="choiceButton" onClick={navigateBackToEdit}>Edit</button>
          <button className="choiceButton" onClick={approveBlog}>Publish Blog</button>
          </div>
        </article>
      </Route>
      <Route path={`${match.url}/success/`} exact>
        <main className="newBlogPostContainer">
            <p>Blog Posted Successfully!</p>
            <Link to="/blog/"><button className="choiceButton">Home</button></Link>
        </main>
      </Route>
      <Route path={`${match.url}/fail/`} exact>
        <main className="newBlogPostContainer">
          <p>Blog Couldn't Be Posted :(</p>
            <Link to="/blog/"><button className="choiceButton">Home</button></Link>
        </main>
      </Route>
    </Switch>
  );
}
