// store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    posts: []
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    addPost(state, post) {
      state.posts.unshift(post);
    },
    clearPosts(state) {
      state.posts = [];
    }
  },

  actions: {
    //Fetch all posts
    async fetchPosts({ commit }) {
      try {
        const res = await fetch("http://localhost:3000/posts", {
          credentials: "include"
        });
        const data = await res.json();
        commit("setPosts", data || []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    },

    //Add a new post
    async addPost({ commit }, post) {
        try {
            const res = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ content: post.content })
            });
            const data = await res.json();
            commit("addPost", data);
        } catch (err) {
            console.error("Failed to add post:", err);
        }
    },

    //Delete all posts
    async deleteAllPosts({ commit }) {
      try {
        const res = await fetch("http://localhost:3000/posts", {
          method: "DELETE",
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to delete posts");
        commit("clearPosts");
      } catch (err) {
        console.error("Failed to delete posts:", err);
      }
    }
  },

  getters: {
    posts: state => state.posts
  }
});
