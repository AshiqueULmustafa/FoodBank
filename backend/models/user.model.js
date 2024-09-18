import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "receiver"],
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to set default fullName if not provided
userSchema.pre("save", function (next) {
  if (!this.fullName) {
    this.fullName = `User${crypto.randomBytes(4).toString("hex")}`;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
