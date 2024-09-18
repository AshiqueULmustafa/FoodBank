// donations.js

// Function to fetch donations from the backend
async function fetchDonations() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/donation/donations-list",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch donations");
    }

    const donations = await response.json();
    return donations;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
}

// Function to create a donation card
function createDonationCard(donation) {

  return `
  
      <section class="ellipse-parent">
        <img
          class="instance-child"
          loading="lazy"
          alt=""
          src="../public/defaultDP.jpg"
        />
        <div class="frame-parent16">
          <div class="richard-bann-parent">
            <b class="richard-bann"></b>
             <b class="richard-bann">Donor's Name :${donation.name}</b>
             <b class="richard-bann">Food : ${donation.foodName}</b>
            

            <div class="quantity-70-parent">
              <div class="quantity-70">Quantity: ${donation.amount}</div>
              <div class="date10032024">Date: ${new Date(
                donation.createdAt
              ).toLocaleDateString()}</div>
              <div class="time-1130-pm">Time: ${new Date(
                donation.createdAt
              ).toLocaleTimeString()}</div>
              <div class="location-agrabad-chattogram">Location: ${donation.receiveLocation }</div>
            </div>
          </div>
          <div class="not-accepted-parent">
            <div class="not-accepted">Not accepted</div>
            <button class="receive-wrapper">
              <div class="receive">Receive</div>
            </button>
          </div>
        </div>
      </section>
    `;
}

// Function to display donations
async function displayDonations() {
  const donationContainer = document.querySelector(".live-donations-inner");
  
  if (!donationContainer) {
    console.error("Donation container not found");
    return;
  }

  donationContainer.innerHTML = ""; // Clear any hardcoded data

  try {
    const donations = await fetchDonations();
    console.log("Donations fetched:", donations);
    
    if (donations.length === 0) {
      donationContainer.innerHTML =
        "<p>No donations available at the moment.</p>";
      return;
    }

    // Append each donation as a card
    donations.forEach((donation) => {
      const donationCard = createDonationCard(donation);
      console.log("Donation card HTML:", donationCard); // Debugging output
      donationContainer.insertAdjacentHTML("beforeend", donationCard);
    });
  } catch (error) {
    console.error("Error displaying donations:", error);
  }
}

// Call the displayDonations function when the page loads
document.addEventListener("DOMContentLoaded", displayDonations);
