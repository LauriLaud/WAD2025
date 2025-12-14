<template>
  <div class="signup-body"> <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="signup-field">
        <label for="email">Email</label>
        <input class="signup-input" type="email" id="email" v-model="email" required />
      </div>
      <div class="signup-field">
        <label for="password">Password</label>
        <input class="signup-input" type="password" id="password" v-model="password" required />
      </div>
      <button class="reset-btn" type="submit">Login</button>
    </form>

    <div style="margin-top: 20px; text-align: center;">
      <p>Need an account?</p>
      <button class="reset-btn" style="background-color: #777;" @click="$router.push('/signup')">
        Go to Sign Up
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      // TODO: Replace with actual fetch to backend
      console.log("Logging in...", this.email);
      // Mocking success:
      localStorage.setItem("token", "sample-jwt-token");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.signup-body {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
}
</style>