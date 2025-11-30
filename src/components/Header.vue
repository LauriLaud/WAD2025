<template>
<header class="site-header">
<nav class="main-nav">
<router-link class="nav-item" to="/">Home</router-link>
<router-link class="nav-item" to="/signup">Sign Up</router-link>
</nav>


<div class="profile-container">
<div class="profile-icon" @click="toggleDropdown">
<img src="@/assets/img/Profile.png" alt="Profile picture" />
</div>


<div class="dropdown-menu" :class="{ show: dropdownOpen }">
<div class="dropdown-item">John Doe</div>
<div class="dropdown-item">john.doe@ut.ee</div>
<div class="dropdown-item">Logout</div>
</div>
</div>
</header>
</template>


<script>
export default {
name: "HeaderComponent",
data() {
return {
dropdownOpen: false
};
},
mounted() {
document.addEventListener("click", this.closeOnOutsideClick);
},
beforeUnmount() {
document.removeEventListener("click", this.closeOnOutsideClick);
},
methods: {
toggleDropdown() {
this.dropdownOpen = !this.dropdownOpen;
},
closeOnOutsideClick(e) {
const profile = this.$el.querySelector(".profile-container");
if (!profile.contains(e.target)) {
this.dropdownOpen = false;
}
},
logout() {
console.log("logout clicked");
}
}
};
</script>