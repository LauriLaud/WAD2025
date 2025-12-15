<template>
  <div class="signup-body">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="signup-field">
        <label for="email">Email</label>
        <input class="signup-input" type="email" id="email" v-model="email" required />
      </div>
      <div class="signup-field">
        <label for="password">Password</label>
        <input class="signup-input" type="password" id="password" v-model="password" required />
      </div>

      <p v-if="errorMessage" style="color:red;">{{ errorMessage }}</p>

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
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // important for cookies
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await res.json();

        if (!res.ok) {
          this.errorMessage = data.error || "Login failed";
          return;
        }

        this.$router.push("/");
      } catch (err) {
        this.errorMessage = "Login failed";
      }
    }
  }
};
</script>
