const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");
const interviewRoutes =
    require("./routes/interviewRoutes");

app.use(
    "/api/interview",
    interviewRoutes
);
app.use("/api/dashboard", dashboardRoutes);
app.get("/",(req,res) =>{
    res.json({
        message:"Backend running successfully"
    });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
