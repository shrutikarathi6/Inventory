const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes=require("./routes/authRoutes");
const excelRoute=require("./routes/excelroute");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/excel", excelRoute);


// Error Handling Middleware (Should be after all routes)
app.use(errorHandler);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
