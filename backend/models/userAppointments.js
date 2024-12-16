import mongoose from "mongoose";
import validator from "validator";
import bcrycpt from "bcryptjs";

const userAppointmentsSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  appointment_id: {
    type: String,
  },
});

const userAppointments = mongoose.model(
  "userAppointments",
  userAppointmentsSchema
);

export default userAppointments;
