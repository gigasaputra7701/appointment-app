import mongoose from "mongoose";
import validator from "validator";
import bcrycpt from "bcryptjs";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  preferred_timezone: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
