<template>
  <main class="container">
    <section class="left-gutter"></section>

    <section>
      <article>
        <div class="signup-body">
          <h1>Sign up</h1>

          <form @submit.prevent="validatePassword">
            <div class="signup-field">
              <label>Email</label>
              <input v-model="email" type="email" class="signup-input" required placeholder="Email" />
            </div>

            <div class="signup-field">
              <label>Password</label>
              <input v-model="password" type="password" class="signup-input" required placeholder="Password" />
            </div>

            <p v-if="errorMessage" style="color:red;">{{ errorMessage }}</p>

            <button type="submit" class="signup-button">Sign up</button>
          </form>
        </div>
      </article>
    </section>

    <aside class="right-gutter"></aside>
  </main>
</template>

<script>
export default {
  name: "SignupView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async validatePassword() {
      const pw = this.password;
      const errors = [];

      if (pw.length < 8 || pw.length > 14) errors.push("Length should be 8 to 15 characters");
      if (!/^[A-Z]/.test(pw)) errors.push("It should start with an uppercase alphabet");
      if (!/[A-Z]/.test(pw)) errors.push("Includes at least one uppercase alphabet character");
      if ((pw.match(/[a-z]/g) || []).length < 2) errors.push("Includes at least two lowercase alphabet characters");
      if (!/[0-9]/.test(pw)) errors.push("Includes at least one numeric value");
      if (!/_/.test(pw)) errors.push('It should include the character "_"');

      if (errors.length > 0) {
        this.errorMessage = "The password is not valid - " + errors.join(", ");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await res.json();

        if (!res.ok) {
          this.errorMessage = "Registration failed";
          return;
        }

        this.$router.push("/login");
      } catch (err) {
        this.errorMessage = "Registration failed";
      }
    }
  }
};
</script>
