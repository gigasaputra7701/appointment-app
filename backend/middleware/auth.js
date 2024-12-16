import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    const decoded = jwt.verify(token, "secret-rahasia-danger"); // Verifikasi token (ganti "secret_key" dengan kunci rahasia Anda)
    const user = await User.findOne({ id: decoded.id }); // Cari pengguna berdasarkan ID dari token
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.User = user; // Tambahkan data pengguna ke objek req
    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token", error });
  }
};
