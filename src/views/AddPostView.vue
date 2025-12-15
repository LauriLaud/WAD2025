<template>
  <main class="container">
    <section class="left-gutter"></section>

    <section class="feed">
      <div class="signup-body addpost-body">
        <h2 class="addpost-title">Add Post</h2>

        <form @submit.prevent="addPost">
          <div class="signup-field textarea-field">
            <label for="content">Body</label>
            <textarea
              id="content"
              class="signup-input auto-textarea"
              v-model="content"
              rows="4"
              required
            ></textarea>
          </div>
          <button class="reset-btn" type="submit">Add</button>
        </form>
      </div>
    </section>

    <aside class="right-gutter"></aside>
  </main>
</template>

<script>
export default {
  name: "AddPostView",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    async addPost() {
      if (!this.content.trim()) {
        alert("Post content cannot be empty");
        return;
      }

      try {
        // Dispatch Vuex action to add post
        await this.$store.dispatch("addPost", {
          content: this.content
        });

        // Clear textarea
        this.content = "";

        // Redirect back to Home
        this.$router.push("/");
      } catch (err) {
        console.error("Failed to add post:", err);
        alert("Failed to add post");
      }
    }
  }
};
</script>
