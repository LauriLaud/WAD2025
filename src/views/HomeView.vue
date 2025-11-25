<template>
<main class="container">
<section class="left-gutter"></section>


<section class="feed">
<PostItem
v-for="post in posts"
:key="post.id"
:post="post"
/>
</section>


<aside class="right-gutter"></aside>
</main>


<section class="reset-section">
<button class="reset-btn" @click="resetAllLikes">Reset All Likes</button>
</section>
</template>


<script>
import PostItem from "@/components/PostItem.vue";


export default {
name: "HomeView",
components: {
PostItem
},
computed: {
posts() {
return this.$store.getters.posts;
}
},
mounted() {
this.$store.dispatch("fetchPosts");
},
methods: {
resetAllLikes() {
this.$store.dispatch("resetLikes");
}
}
};
</script>