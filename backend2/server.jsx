const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db.jsx");
const studentRoutes = require("./routes/studentRoutes.jsx");
const errorHandler = require("./middleware/errorHandler.jsx");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/students", studentRoutes);
app.use(errorHandler);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
