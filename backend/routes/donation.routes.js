import express from "express";
import {
  createDonation,
  getDonations,
  getDonationById,
} from "../controllers/donation.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/donate", createDonation);

router.get("/donations-list", getDonations);

router.get("donation-details/:id", getDonationById);

export default router;
