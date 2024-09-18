import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    donerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiveLocation: {
      type: String,
    },
    dateOfReceive: {
      type: Date,
      required: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
