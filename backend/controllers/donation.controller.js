import Donation from "../models/donation.model.js";

// Create a new donation (existing function)
export const createDonation = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    const { name, foodName, amount, donerId, dateOfReceive, receiveLocation, notes } = req.body;

    if (!donerId) {
      return res.status(400).json({ message: "Donor ID is required" });
    }

    const newDonation = new Donation({
      name,
      foodName,
      amount,
      donerId,
      dateOfReceive,
      receiveLocation,
      notes,
    });

    const savedDonation = await newDonation.save();
    res.status(201).json({
      message: "Donation created successfully",
      donation: savedDonation,
    });
  } catch (error) {
    console.error("Error creating donation:", error.message);
    res.status(500).json({
      message: "Error creating donation",
      error: error.message,
    });
  }
};

// Get donation by ID (new function)
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error("Error retrieving donation:", error.message);
    res.status(500).json({ message: "Error retrieving donation", error: error.message });
  }
};
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find(); // Find all donations

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error retrieving donations:", error.message);
    res.status(500).json({
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};