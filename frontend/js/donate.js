document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("donationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const foodName = document.getElementById("foodName").value;
    const amount = document.getElementById("amount").value;
    const receiveLocation = document.getElementById("receiveLocation").value;
    const dateOfReceive = document.getElementById("dateOfReceive").value;
    const notes = document.getElementById("notes").value;

    const storedUser = localStorage.getItem("authUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user._id) {
      console.error("User not logged in or missing _id");
      alert("You need to be logged in to make a donation.");
      return;
    }

    const donationData = {
      name,
      foodName,
      amount,
      donerId: user._id,
      receiveLocation,
      dateOfReceive,
      notes,
    };

    try {
      const response = await fetch("http://localhost:5000/api/donation/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (response.ok) {
        // Append the newly added donation to the donation list
        const donationList = document.getElementById("donationsList");

        if (donationList) {
          const donationElement = document.createElement("div");
          donationElement.textContent = `Donation from: ${name} - Food: ${foodName} - Location:${receiveLocation}`;
          donationList.appendChild(donationElement);
        } else {
          console.error("Donation list container not found.");
        }

        document.getElementById("popup").classList.remove("hidden");
        document.getElementById("donationForm").reset(); // Reset the form after success
      } else {
        console.error("Failed to submit donation:", data.message || "Unknown error");
        alert("Failed to submit the donation. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the donation.");
    }
  });
});
