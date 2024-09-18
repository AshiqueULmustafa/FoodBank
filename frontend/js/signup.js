document.addEventListener("DOMContentLoaded", function () {
  const donorBox = document.getElementById("donor-box");
  const receiverBox = document.getElementById("receiver-box");
  const selectedRole = document.getElementById("selected-role");

  // Add click event listeners to role boxes
  donorBox.addEventListener("click", function () {
    selectRole("donor", donorBox, receiverBox);
  });

  receiverBox.addEventListener("click", function () {
    selectRole("receiver", receiverBox, donorBox);
  });

  function selectRole(role, selectedBox, otherBox) {
    selectedRole.value = role;
    selectedBox.classList.add("selected");
    otherBox.classList.remove("selected");
  }

  // Handle form submission
  document
    .getElementById("signup-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = selectedRole.value;

      if (!role) {
        alert("Please select your role.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            role: role,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("authUser", JSON.stringify(data));
          alert("Signup successful!");

          // Redirect based on role
          if (role === "donor") {
            window.location.href = "donate.html";
          } else if (role === "receiver") {
            window.location.href = "donations.html";
          }
        } else {
          handleError(data);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
      }
    });

  function handleError(data) {
    const errorMessages = {
      "Email already in use":
        "This email address is already registered. Please use a different email.",
      "All fields are required": "Please make sure all fields are filled out.",
      "Internal Server Error":
        "Something went wrong on our end. Please try again later.",
    };

    const message =
      errorMessages[data.error] ||
      data.message ||
      "Signup failed. Please try again.";
    alert(message);
  }
});
