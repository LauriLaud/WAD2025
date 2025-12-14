<template>
  <main class="container">
    <section class="left-gutter"></section>

    <section class="feed">
      <div class="signup-body addpost-body">
        <!-- Main title -->
        <h2 class="addpost-title">Add Post</h2>

        <form @submit.prevent="addPost">
          <!-- Body only -->
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

          <!-- Centered button -->
          <button class="reset-btn" type="submit">Add</button>
        </form>
      </div>
    </section>

    <aside class="right-gutter"></aside>
  </main>
</template>
