document.addEventListener("DOMContentLoaded", function () {
  const profilePic = document.getElementById("profile-pic");
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const donationsMadeList = document.getElementById("donations-made");
  const donationsReceivedList = document.getElementById("donations-received");

  // Fetch user data
  async function fetchUserData() {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your authentication setup
        },
      });

      const data = await response.json();
      if (response.ok) {
        profilePic.src = data.profilePic || "path/to/defaultDP.jpg"; // Use a default image if none is provided
        fullName.textContent = data.fullName;
        email.textContent = data.email;

        data.donationsMade.forEach((donation) => {
          const li = document.createElement("li");
          li.textContent = donation; // Customize this based on the donation data structure
          donationsMadeList.appendChild(li);
        });

        data.donationsReceived.forEach((donation) => {
          const li = document.createElement("li");
          li.textContent = donation; // Customize this based on the donation data structure
          donationsReceivedList.appendChild(li);
        });
      } else {
        console.error("Error fetching user data:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Handle logout
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your authentication setup
          },
        });
        localStorage.removeItem("token");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Logout error:", error);
      }
    });
  }

  // Initialize profile data
  fetchUserData();
});
