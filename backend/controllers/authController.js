import User from "../models/User.js";
import { users } from "../data.js";
import jwt from "jsonwebtoken";
import Appointments from "../models/Appointments.js";

export const LoginUser = async (req, res) => {
  try {
    const { username } = req.body;
    console.log("Received username:", username); // Debug input
    console.log("Users list:", users); // Debug data users

    // Cari user dari array `users`
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log("Error during login:", error); // Debug error
    return res.status(500).json({ message: "Error", error });
  }
};

export const GetAppointments = (req, res) => {
  res.send("Get Appointment Berhasil");
};
export const PostAppointments = async (req, res) => {
  try {
    const createAppointment = await Appointments.create({
      title: req.body.title,
      creator_id: req.User.id,
      start: req.body.start,
      end: req.body.end,
    });
    return res.status(201).json({
      message: "Success Create Appointment",
      data: createAppointment,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error,
    });
  }
};
export const LogoutUser = (req, res) => {
  res.send("Logout Berhasil");
};
