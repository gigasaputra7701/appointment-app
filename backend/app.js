import express from "express";
import cors from "cors";
import authRouter from "./router/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Parent Router
app.use("/api/v1/auth", authRouter);

// Start server
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
