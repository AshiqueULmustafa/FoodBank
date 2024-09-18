document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const googleLoginBtn = document.getElementById("google-login-btn");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.role === "donor") {
            window.location.href = "donate.html";
          } else if (data.role === "receiver") {
            window.location.href = "donations.html";
          }
        } else {
          alert(data.error); // Updated to match the error field in the response
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
      }
    });
  }

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", function () {
      // Handle Google login if needed
      alert("Google login is not yet implemented.");
    });
  }
});
