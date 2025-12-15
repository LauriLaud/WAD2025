<template>
  <main class="container">
    <section class="left-gutter"></section>

    <section class="feed">
      <div class="signup-body addpost-body">
        <h2 class="addpost-title">A Post</h2>

        <form>
          <div class="signup-field textarea-field">
            <label for="content">Body</label>
            <textarea
              id="content"
              class="signup-input auto-textarea"
              rows="4"
              v-model="content"
              required
            ></textarea>
          </div>
          
          <div class="feed-actions">
            <button
              type="button"
              class="reset-btn secondary"
              @click="updatePost"
            >
              Update
            </button>

            <button
              type="button"
              class="reset-btn"
              @click="deletePost"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </section>

    <aside class="right-gutter"></aside>
  </main>
</template>

<script>
export default {
  name: "APostView",
  data() {
    return {
      postId: null,
      content: ""
    };
  },
  async mounted() {
    this.postId = this.$route.params.id;

    const res = await fetch(`http://localhost:3000/posts/${this.postId}`, {
      credentials: "include"
    });
    const data = await res.json();

    this.content = data.content;
  },
  methods: {
    async updatePost() {
      await fetch(`http://localhost:3000/posts/${this.postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: this.content })
      });

      this.$router.push("/");
    },
    async deletePost() {
      await fetch(`http://localhost:3000/posts/${this.postId}`, {
        method: "DELETE",
        credentials: "include"
      });

      this.$router.push("/");
    }
  }
};
</script>

