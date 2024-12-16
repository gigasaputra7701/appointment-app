import express from "express";
import {
  LoginUser,
  GetAppointments,
  LogoutUser,
  PostAppointments,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/auth.js";
const router = express.Router();

// post/api/v1/auth/login
router.post("/login", (req, res) => {
  console.log("Login endpoint hit with data:", req.body);
  LoginUser(req, res);
});
// get/api/v1/auth/appointments
router.get("/appointments", authenticateUser, GetAppointments);

router.post("/appointments", authenticateUser, PostAppointments);

router.get("/logout", LogoutUser);

export default router;
