<template>
<article class="post">
<header class="post-header">
<div class="profile-icon">
<img src="@/assets/img/Profile.png" />
</div>
<span>{{ post.author || "Unknown" }}</span>
</header>


<div v-if="post.image" class="post-image">
<img :src="post.image" :alt="post.title" />
</div>


<div class="post-body">
<h3>{{ post.title }}</h3>
<p>{{ post.content }}</p>


<div class="like-row">
<button class="like-btn" @click="likePost">🖒</button>
<span class="like-count">{{ post.likes }} likes</span>
</div>
</div>
</article>
</template>


<script>
export default {
name: "PostItem",
props: {
post: Object
},
methods: {
likePost() {
this.$store.dispatch("likePost", this.post.id);
}
}
};
</script>