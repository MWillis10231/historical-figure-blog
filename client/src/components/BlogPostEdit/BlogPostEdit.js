import { format, formatISO } from "date-fns";
import { useEffect, useState } from "react";
import BlogTags from "../BlogTags.js/BlogTags";
import BlogTime from "../BlogTime/BlogTime";
import ImageList from "../ImageList/ImageList";
import TextEditor from "../TextEditor/TextEditor";

export default function BlogPostEdit(props) {
    let comment = "Comments";
    if (props.blogPost.total_comments === "1") {
      comment = "Comment";
    }

    //format the date / time
    const dateObject = new Date(props.blogPost.date);
    //console.log(dateObject)
  const theDate = format(dateObject, "yyyy-MM-dd");
  const theTime = format(dateObject, "HH:mm:ss")
  //console.log(theDate)
  //console.log(theTime)

  const [changePublish, setChangePublish] = useState("no");
  const [futurePost, setFuturePost] = useState("none");
  const [timeValue, setTimeValue] = useState(theTime);
  const [dateValue, setDateValue] = useState(theDate);
  const [title, setTitle] = useState(props.blogPost.title)
  const [imageUrl, setImageUrl] = useState(props.blogPost.image)
  const [tags, setTags] = useState(props.blogPost.tags)

  useEffect(() => {
    if (changePublish === "no") {
      setFuturePost("none");
      setTimeValue(theTime);
      setDateValue(theDate);
    } else if (changePublish === "yes") {
      setFuturePost("flex");
    }
  }, [theDate, changePublish, theTime]);

    // this function adds the blog post to the server
    async function editBlogOnServer(data = {}) {
        const response = await fetch(`/api/blog/${props.blogPost.id}/edit/`, {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data),
        });
        return response;
      }

  // function to pass down to the Image List to set the content so it persists on editing
  function alterImage(image) {
    setImageUrl(image)
  }

  function submitEdits(event) {
    // prevent page refresh
    event.preventDefault();

    // title, image & content we get from the text fields
    const blogTitle = document.getElementById("newPostTitle").value;
    const blogContent = document.getElementById("NewPostContent").value;
    const blogImage = document.getElementById("newPostImage").value

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
    if (changePublish === "no") {
      blogDate = props.blogPost.date;
    } else if (changePublish === "yes") {
      const blogPostTime = document.getElementById("newPostTime").value;
      const blogPostDate = document.getElementById("newPostDate").value;
      blogDate = formatISO(new Date(blogPostDate + "," + blogPostTime));
    }
    //console.log(blogDate);

    // create the blog object
      const blogPostPreview = {
      authorId: props.blogPost.author_id,
      blogTitle: blogTitle,
      blogTags: tagsReduced,
      blogContent: blogContent,
      blogPostDate: blogDate,
      blogImage: blogImage,
    };
 
    editBlogOnServer(blogPostPreview)
    props.toggleEdit();
  }

    return (
        <form className="BlogPostSingleForm" onSubmit={(e) => submitEdits(e)}>
        <header
          className="BlogPostHeader"
          style={{
            backgroundImage: `url(/images/${imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="BlogPostHeaderContent">
            <h2>{title}</h2>
            <ul className="BlogPostHeaderSubContent">
              <li>
                by <strong>{props.blogPost.username}</strong>
              </li>
              <li>
                <BlogTime date={props.blogPost.date} />
              </li>
              <li>
                {props.blogPost.total_comments} {comment}
              </li>
            </ul>
          </div>
          <div className="overlay blue"></div>
        </header>
        <button className="choiceButton" onClick={props.toggleEdit}>Cancel</button>
        <fieldset>
              <legend>
                <h3>Title and Image</h3>
              </legend>
              <div className="FormItem">
                <label htmlFor="newPostTitle">Enter the new blog post title:</label>
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
              <div className="FormItem">
                <ImageList targetId="newPostImage" value={imageUrl} alterImage={alterImage}/>
              </div>
            </fieldset>
        <fieldset>
          <legend>
            <h3>Publish</h3>
          </legend>
          <div className="BlogPostCreateScheduleTime">
            <div className="FormItem">
              <label htmlFor="changeTime">Change publish time?</label>
              <select
                name="changeTime"
                id="newPostScheduleTime"
                onChange={(e) => setChangePublish(e.target.value)}
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
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
                disabled={changePublish === "no" ? true : false}
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
                disabled={changePublish === "no" ? true : false}
                step="any"
              ></input>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h3>Tags</h3>
          </legend>
          <p>Separate up to three tags with commas (no spaces).</p>
          <div className="FormItem">
            <label htmlFor="newPostTags">Tags</label>
            <input type="text" name="newPostTags" id="newPostTags" value={tags} onChange={(e) => setTags(e.target.value)}></input>
          </div>
          <BlogTags tags={props.blogPost.tags}/>
        </fieldset>
        <fieldset>
              <legend>
                <h3>Content</h3>
              </legend>
              <TextEditor value={props.blogPost.content} targetId="NewPostContent" blog="true"/>
        </fieldset>
        <div className="ButtonContainer">
        <button className="choiceButton" onClick={props.toggleEdit}>Cancel</button><button className="choiceButton" type="submit">Submit Edits</button>
        </div>
      </form>
    )
}