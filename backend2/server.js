const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const GststudentRoutes = require("./routes/gst/studentRoutes");
const NonGststudentRoutes = require("./routes/nongst/studentRoute");
const authRoutes=require("./routes/common/authRoutes");
const GstexcelRoute=require("./routes/gst/excelroute");
const NonGstexcelRoute=require("./routes/nongst/excelroute");


const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use("/gst/students", GststudentRoutes);
app.use("/nongst/students", NonGststudentRoutes);
app.use("/auth", authRoutes);
app.use("/gst/excel", GstexcelRoute);
app.use("/nongst/excel", NonGstexcelRoute);




// Error Handling Middleware (Should be after all routes)
app.use(errorHandler);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
