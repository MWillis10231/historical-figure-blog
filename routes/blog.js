const Router = require("express-promise-router");
const database = require("../database");
var formatISO = require("date-fns/formatISO");

const router = new Router();

/* GET All blog posts. */
router.get("/", async (req, res, next) => {
  // send all blog posts BUT not those in the future
  // date now for comparison
  const date = formatISO(new Date());

  const results = await database.query(
    "SELECT blog_posts.id AS id, blog_posts.author_id AS author_id, blog_posts.date AS date, users.username AS username, blog_posts.title AS title, blog_posts.content AS content, blog_posts.tags AS tags, blog_posts.views AS views, blog_posts.reactions AS reactions, blog_posts.image AS image, COUNT(blog_comments.id) AS total_comments FROM blog_posts LEFT JOIN users ON blog_posts.author_id = users.id LEFT JOIN blog_comments ON blog_comments.blog_id = blog_posts.id WHERE blog_posts.date < $1 GROUP BY blog_posts.id, users.username ORDER BY blog_posts.date DESC",
    [date]
  );
  if (results.rows.length) {
    res.send(results.rows);
  } else {
    res.status(404).json({ error: "Blog posts could not be found" });
  }
});

/* GET A single blog post's comments. */
router.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  // send a single in response
  const results = await database.query(
    "SELECT blog_comments.id AS id, blog_comments.date AS date, users.username AS username, blog_comments.author_id AS author_id, blog_comments.content AS content, blog_comments.reactions AS reactions, blog_comments.blog_id AS blog_id, blog_comments.parent_id AS parent_id, blog_comments.reported AS reported, blog_comments.deleted AS deleted, blog_comments.edited AS edited, blog_comments.history AS history FROM blog_comments, users WHERE blog_comments.author_id = users.id AND blog_id = $1 ORDER BY blog_comments.date DESC",
    [postId]
  );
  if (results.rows) {
    database.query("UPDATE blog_posts SET views = views + 1 WHERE id = $1", [
      postId,
    ]);
    res.send(results.rows);
  } else {
    res.status(404).json({ error: "Comments could not be found" });
  }
});

/* POST A new blog post. */

router.post("/admin/create", async (req, res, next) => {
  const {
    authorId,
    blogTitle,
    blogTags,
    blogContent,
    blogPostDate,
    blogImage,
  } = req.body;

  // if it's to publish now, set the date/time
  let date;
  if (blogPostDate === "now") {
    date = formatISO(new Date());
  } else {
    date = blogPostDate;
  }

  let image = "none.webp";
  if (blogImage) {
    image = blogImage;
  }

  // make sure the tags are valid Json
  const blogTagArray = blogTags.split(",");
  const blogTagsJSON = JSON.stringify(blogTagArray);

  // make sure that authorId can edit blog posts
  const userResults = await database.query(
    "SELECT * FROM users WHERE id = $1",
    [authorId]
  );
  if (userResults.rows[0].admin === false) {
    res.send(Error("User is not allowed to post!"));
  }

  // if all is good, push to database!
  try {
    const results = await database.query(
      "INSERT INTO blog_posts (date, author_id, content, tags, title, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [date, authorId, blogContent, blogTagsJSON, blogTitle, image]
    );
    if (results.rows) {
      res.send("Success");
    }
  } catch (error) {
    res.send(Error("Something went wrong, please try again later"));
    console.log(error);
  }
  // assuming that's all ok, send to server
});

// Edit a Blog Post
//*** here we need to check that someone is only a Blog Post they have permission to ***
router.put("/:postId/edit/", async (req, res, next) => {
  const { postId } = req.params;
  const {
    authorId,
    blogTitle,
    blogTags,
    blogContent,
    blogPostDate,
    blogImage,
  } = req.body;

  // if it's to publish now, set the date/time
  let date;
  if (blogPostDate === "now") {
    date = formatISO(new Date());
  } else {
    date = blogPostDate;
  }

  let image = "none.webp";
  if (blogImage) {
    image = blogImage;
  }

  // make sure the tags are valid Json
  const blogTagArray = blogTags.split(",");
  const blogTagsJSON = JSON.stringify(blogTagArray);

  // make sure that authorId can edit blog posts
  const userResults = await database.query(
    "SELECT * FROM users WHERE id = $1",
    [authorId]
  );
  if (userResults.rows[0].admin === false) {
    res.send(Error("User is not allowed to post!"));
  }

  // if all is good, push to database!

  try {
    const results = await database.query(
      "UPDATE blog_posts SET date = $1, author_id = $2, content = $3, tags = $4, title = $5, image = $6 WHERE id = $7",
      [date, authorId, blogContent, blogTagsJSON, blogTitle, image, postId]
    );
    if (results.rows) {
      res.send("Success");
    }
  } catch (error) {
    res.send(Error("Something went wrong, please try again later"));
    console.log(error);
  }
  // assuming that's all ok, send to server
});

/* POST A new blog comment. */

router.post("/:postId/comment", async (req, res, next) => {
  const { postId } = req.params;
  const { authorId, commentContent, parentCommentId } = req.body;
  // set the date/time
  let date = formatISO(new Date());
  // set results, if it's a top level commment then it's parent_id === null
  let results;

  if (parentCommentId === "null") {
    results = await database.query(
      "INSERT INTO blog_comments (date, author_id, content, blog_id) VALUES ($1, $2, $3, $4)",
      [date, authorId, commentContent, postId]
    );
  } else {
    results = await database.query(
      "INSERT INTO blog_comments (date, author_id, content, blog_id, parent_id) VALUES ($1, $2, $3, $4, $5)",
      [date, authorId, commentContent, postId, parentCommentId]
    );
  }
  if (results.rows) {
    let newComment = await database.query(
      "SELECT blog_comments.id AS id, blog_comments.date AS date, users.username AS username, blog_comments.author_id AS author_id, blog_comments.content AS content, blog_comments.reactions AS reactions, blog_comments.blog_id AS blog_id, blog_comments.parent_id AS parent_id, blog_comments.reported AS reported, blog_comments.deleted AS deleted, blog_comments.edited AS edited, blog_comments.history AS history FROM blog_comments, users WHERE blog_comments.author_id = users.id AND date = $1 AND author_id = $2 AND content = $3 AND blog_id = $4",
      [date, authorId, commentContent, postId]
    );
    res.send(newComment.rows[0]);
  } else {
    res.send(Error("No blog post found!"));
  }
});

// Add/Edit a reaction on a blog post
router.put("/:postId/react", async (req, res, next) => {
  const { postId } = req.params;
  const { newReaction } = req.body;
  let results = await database.query(
    "UPDATE blog_posts SET reactions = $1 WHERE id = $2",
    [newReaction, postId]
  );
  if (results.rows) {
    res.send("Success");
  } else {
    res.send(Error("There's been an error!"));
  }
});

// Add/Edit a reaction on a comment

router.put("/:postId/comment/react", async (req, res, next) => {
  const { postId } = req.params;
  const { commentId, newReaction } = req.body;
  let results = await database.query(
    "UPDATE blog_comments SET reactions = $1 WHERE id = $2 AND blog_id = $3",
    [newReaction, commentId, postId]
  );
  if (results.rows) {
    res.send("Success");
  } else {
    res.send(Error("There's been an error!"));
  }
});

// Edit a comment
router.put("/:postId/comment/edit", async (req, res, next) => {
  const { postId } = req.params;
  const { commentId, newComment, userId } = req.body;

  // make sure that user is editing only their own comment
  const userResults = await database.query(
    "SELECT * FROM blog_comments WHERE id = $1",
    [commentId]
  );
  if (userResults.rows[0].author_id !== parseInt(userId)) {
    res.send(Error("User is not allowed to edit someone else's comments!"));
  } else {
    // first of all we should push the old comment to its history array
    let originals = await database.query(
      "SELECT content, history FROM blog_comments WHERE id = $1 and blog_id = $2",
      [commentId, postId]
    );
    let oldComment = originals.rows[0].content;
    let oldArray = originals.rows[0].history;
    let newArray = [...oldArray, oldComment];
    let newArrayJSON = JSON.stringify(newArray);

    // then we update the comment itself
    let results = await database.query(
      "UPDATE blog_comments SET content = $1 WHERE id = $2 AND blog_id = $3",
      [newComment, commentId, postId]
    );
    if (results.rows) {
      await database.query(
        "UPDATE blog_comments SET edited = $1, history = $2 WHERE id = $3 AND blog_id = $4",
        [true, newArrayJSON, commentId, postId]
      );
      res.send("Success");
    } else {
      res.send(Error("There's been an error!"));
    }
  }
});

// Delete a comment
/* again needs to check if it's your own comment */
router.delete("/:postId/comment/delete", async (req, res, next) => {
  const { postId } = req.params;
  const { commentId, userId } = req.body;
  console.log("PostId is " + postId);
  console.log("CommentId is " + commentId);
  console.log("UserId is " + userId);

  // make sure that user is editing only their own comment
  const userResults = await database.query(
    "SELECT * FROM blog_comments WHERE id = $1",
    [commentId]
  );

  if (userResults.rows[0].author_id !== parseInt(userId)) {
    res.send(Error("User is not allowed to delete someone else's comments!"));
  } else {
    // if the comment has children, we should "censor it" rather than delete
    let children = await database.query(
      "SELECT * FROM blog_comments WHERE parent_id = $1",
      [commentId]
    );
    if (children.rows.length === 0) {
      //console.log("It has no children!");
      let results = await database.query(
        "DELETE FROM blog_comments WHERE id = $1 AND blog_id = $2",
        [commentId, postId]
      );
      if (results.rows) {
        //console.log("Deleted!");
        res.json(commentId);
      } else {
        res.send(Error("There has been an error!"));
      }
    } else {
      //console.log("It has children!");
      let deleted = true;
      let results = await database.query(
        "UPDATE blog_comments SET deleted = $1 WHERE id = $2 AND blog_id = $3",
        [deleted, commentId, postId]
      );
      if (results.rows) {
        res.send("Comment censored successfully");
        console.log("CEnsored!");
      } else {
        res.send(Error("There has been an error!"));
      }
    }
  }
});

//Report a comment
router.put("/:postId/comment/report", async (req, res, next) => {
  const { postId } = req.params;
  const { reportType, reportText, commentId, userId } = req.body;
  let reported = true;

  //get the original report array
  let originals = await database.query(
    "SELECT reports FROM blog_comments WHERE id = $1 and blog_id = $2",
    [commentId, postId]
  );
  let oldArray = originals.rows[0].reports;

  //construct a new report
  let newReport = {
    type: reportType,
    text: reportText,
    user: userId,
  };

  // push the report to the array of reports
  let newArray = [...oldArray, newReport];
  let newArrayJSON = JSON.stringify(newArray);

  // update the database with reported = true and the new report array

  let results = await database.query(
    "UPDATE blog_comments SET reported = $1, reports = $2 WHERE id = $3 AND blog_id = $4",
    [reported, newArrayJSON, commentId, postId]
  );
  if (results.rows) {
    res.send("Comment reported successfully");
  } else {
    res.send(Error("There has been an error!"));
  }
});

module.exports = router;
