const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
// Middlewares
const morgan = require("morgan");
// Route Files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Load env vars
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const app = express();

// Request body parser
app.use(express.json());
// Connect to database
connectDB();
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Pass request through error handler middleware
app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(
        `App is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error : ${err.message}`);
    // Close server
    server.close(() => process.exit(1));
});