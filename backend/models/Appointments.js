import mongoose from "mongoose";
import validator from "validator";
import bcrycpt from "bcryptjs";

const appointmentsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  creator_id: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

const Appointments = mongoose.model("Appointments", appointmentsSchema);

export default Appointments;
