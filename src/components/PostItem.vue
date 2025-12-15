<template>
  <article class="post" @click="goToPost">
    <header class="post-header">
      <span>{{ formattedDate }}</span>
    </header>

    <div v-if="post.image" class="post-image">
      <img :src="post.image" alt="Post image" />
    </div>

    <div class="post-body">
      <p>{{ post.content }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      if (!this.post.created_at) return "Unknown";

      const date = new Date(this.post.created_at);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  },
  methods: {
    goToPost() {
        this.$router.push(`/post/${this.post.id}`);
    }
  }
};
</script>
