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

    <div class="feed-actions">
      <button class="reset-btn secondary" @click="goToAddPost">
        Add Post
      </button>

      <button class="reset-btn" @click="resetAllLikes">
        Reset All Likes
      </button>
    </div>
  </main>
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
    },
    goToAddPost() {
      this.$router.push("/add");
    }
  }
};
</script>
