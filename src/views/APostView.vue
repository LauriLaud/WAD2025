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
              required
            ></textarea>
          </div>
          
          <div class="feed-actions">
            <button
              type="button"
              class="reset-btn secondary"
            >
              Update
            </button>

            <button
              type="button"
              class="reset-btn"
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
  name: "APostView"
};
</script>
