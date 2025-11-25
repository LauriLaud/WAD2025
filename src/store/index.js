import { createStore } from "vuex";


export default createStore({
state: {
posts: []
},


mutations: {
setPosts(state, posts) {
state.posts = posts;
},
likePost(state, postId) {
const post = state.posts.find(p => p.id === postId);
if (post) post.likes++;
},
resetLikes(state) {
state.posts.forEach(p => (p.likes = 0));
}
},


actions: {
async fetchPosts({ commit }) {
const response = await fetch("/posts.json", { cache: "no-cache" });
const data = await response.json();
commit("setPosts", data.posts || []);
},
likePost({ commit }, postId) {
commit("likePost", postId);
},
resetLikes({ commit }) {
commit("resetLikes");
}
},


getters: {
posts: state => state.posts
}
});
