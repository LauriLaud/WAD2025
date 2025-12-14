<template>
  <div class="container contact-page">
    <h1>Contact Us</h1>
    <p>If you have any questions, feel free to reach out!</p>
    
    <div class="contact-details-box">
      <p><strong>Email:</strong> help@postit.com</p>
      <p><strong>Phone:</strong> +372 5123 4567</p>
      <p><strong>Address:</strong> Ülikooli tn 18, 50090 Tartu</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactView"
};
</script>

<style scoped>
/* Scoped styles for the Contact View */

/* Class to center all items vertically and horizontally */
.contact-page {
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically (if height allows) */
  min-height: 80vh; /* Ensure it takes up enough screen space */
  text-align: center;
  gap: 15px; /* Spacing between main elements */
}

/* Style for the information box, similar to your signup-body background */
.contact-details-box {
  background: #ffffff; /* White background */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 1px 0 rgba(0,0,0,0.04); /* Light shadow */
  padding: 30px;
  width: 100%;
  max-width: 400px; /* Constrain width */
  text-align: left; /* Keep text inside the box left-aligned for readability */
}

.contact-details-box p {
  margin: 10px 0;
}
</style>