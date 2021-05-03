// A mock function to mimic making an async request for all blog posts
const blogPost = require('../../../src/components/sampleBlogPost.json')

export function fetchPosts() {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: blogPost }), 500)
    );
  } 

export function fetchSinglePost(postId) {
    let post = blogPost.find(post => post.id === postId)
    return new Promise((resolve) =>
    setTimeout(() => resolve({ data: post }), 500)
  );
}