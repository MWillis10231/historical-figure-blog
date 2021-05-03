import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { fetchPosts, fetchSinglePost } from './blogFakeApi';

const initialState = {
  posts: [],
  comments: {
    status: "idle",
    content: [],
    error: null,
  },
  status: "idle",
  error: null,
};

// async Thunk for getting all posts
export const getAllPosts = createAsyncThunk("/blog/fetchAllPosts", async () => {
  const response = await fetch("/api/blog/");
  //console.log(response);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else if (response.status === 403) {
    return Promise.reject(new Error("403 - Forbidden"));
  } else {
    return Promise.reject(
      new Error(`${response.status} - ${response.statusText}`)
    );
  }
});

// async Thunk for getting a single post
export const getBlogComments = createAsyncThunk(
  "blog/fetchBlogComments",
  async (post) => {
    const response = await fetch(`/api/blog/${post}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else if (response.status === 403) {
      return Promise.reject(new Error("403 - Forbidden"));
    } else {
      return Promise.reject(
        new Error(`${response.status} - ${response.statusText}`)
      );
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetState(state, action) {
      state.error = null;
      state.status = "idle";
      state.posts = [];
    },
    addView(state, action) {
      // this needs to be redone to select the exact correct post (we probably need to grab the index)
      state.singlePost.content.views += 1;
    },
    addComment(state, action) {
      if (!Array.isArray(state.comments.content)) {
        // this neeeded to be added, because if the server retrieved no comments it automatically changes the state to an empty object, which makes the array functions throw an error
        state.comments.content = [];
      }
      console.log(action.payload);
      state.comments.content.unshift(action.payload);
    },
    changeComment(state, action) {
      // find the right comment then change its contents
      const { commentId, newComment } = action.payload;
      let comment = state.comments.content.find(
        (comment) => comment.id === commentId
      );
      comment.history.push(comment.content);
      comment.content = newComment;
      comment.edited = true;
    },
    removeComment(state, action) {
      // if it has comments, set its status to deleted
      let hasComments = state.comments.content.filter(
        (comment) => comment.parent_id === action.payload
      );
      if (hasComments.length) {
        let comment = state.comments.content.find(
          (comment) => comment.id === action.payload
        );
        comment.deleted = true;
      } else {
        //otherwise filter it out
        state.comments.content = state.comments.content.filter(
          (comment) => comment.id !== action.payload
        );
      }
    },
    addBlogReaction(state, action) {
      const { blogId, userId, newReaction } = action.payload;
      // find the comment with exact Id and if it exists, add the new reaction to the old
      let blog = state.posts.find((blog) => blog.id === blogId);
      if (blog) {
        let hasUserReacted = blog.reactions.find(
          (reaction) => reaction.userId === userId
        );
        if (hasUserReacted) {
          // if they've reacted, set their reaction to the new reaction (assuming it's different)
          if (hasUserReacted.reaction !== newReaction) {
            hasUserReacted.reaction = newReaction;
          } else {
            // otherwise we should remove the reaction
            blog.reactions = blog.reactions.filter(
              (reaction) => reaction.userId !== userId
            );
          }
        } else {
          // if they haven't reacted, add their reaction to the array
          blog.reactions.push({ userId: userId, reaction: newReaction });
        }
      }
    },
    addCommentReaction(state, action) {
      const { commentId, userId, newReaction } = action.payload;
      // find the comment with exact Id and if it exists, add the new reaction to the old
      let comment = state.comments.content.find(
        (comment) => comment.id === commentId
      );
      if (comment) {
        let hasUserReacted = comment.reactions.find(
          (reaction) => reaction.userId === userId
        );
        if (hasUserReacted) {
          // if they've reacted, set their reaction to the new reaction (assuming it's different)
          if (hasUserReacted.reaction !== newReaction) {
            hasUserReacted.reaction = newReaction;
          } else {
            // otherwise we should remove the reaction
            comment.reactions = comment.reactions.filter(
              (reaction) => reaction.userId !== userId
            );
          }
        } else {
          // if they haven't reacted, add their reaction to the array
          comment.reactions.push({ userId: userId, reaction: newReaction });
        }
      }
    },
    addReport(state, action) {
      const { commentId } = action.payload;
      // find the comment with exact Id and if it exists, add the report
      let comment = state.comments.content.find(
        (comment) => comment.id === commentId
      );
      if (comment) {
        //set reported to true
        comment.reported = true;
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBlogComments.pending, (state) => {
        state.comments.status = "loading";
        state.error = null;
      })
      .addCase(getBlogComments.fulfilled, (state, action) => {
        state.comments.status = "success";
        state.comments.content = action.payload;
        state.comments.error = null;
      })
      .addCase(getBlogComments.rejected, (state, action) => {
        state.comments.status = "failed";
        state.comments.error = action.error.message;
      });
  },
});

export const {
  resetState,
  addView,
  addComment,
  changeComment,
  removeComment,
  addReport,
  addCommentReaction,
  addBlogReaction,
} = blogSlice.actions;

export default blogSlice.reducer;

export const selectBlogStatus = (state) => state.blog.status;
export const selectBlogError = (state) => state.blog.error;
export const selectAllBlogPosts = (state) => state.blog.posts;
export const selectAllTags = (state) =>
  state.blog.posts.map(function (value, index) {
    if (value.tags) {
      return value.tags;
    } else {
      return null;
    }
  });
export const selectBlogPostsByTag = (state, tag) =>
  state.blog.posts.filter((element) => element.tags.includes(tag));
export const selectBlogPostsByAuthor = (state, authorId) =>
  state.blog.posts.filter((element) => element.author_id === authorId);
export const selectSingleBlogPost = (state, blogPostId) =>
  state.blog.posts.find((element) => element.id === blogPostId);
export const selectLatestBlogPost = (state) => state.blog.posts[0];
export const selectBlogCommentStatus = (state) => state.blog.comments.status;
export const selectBlogComments = (state) => state.blog.comments.content;
export const selectBlogCommentError = (state) => state.blog.comments.error;
