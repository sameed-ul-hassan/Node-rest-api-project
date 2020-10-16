const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load Models
const Bootcamps = require("./models/Bootcamps");
const Course = require("./models/Course");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// DB connection

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import data into DB
const importData = async() => {
    try {
        await Bootcamps.create(bootcamps);
        await Course.create(courses);
        console.log("Data Imported".green.inverse);
    } catch (error) {
        console.error(error);
    }
};

// Delete data from DB
const deleteData = async() => {
    try {
        await Bootcamps.deleteMany();
        await Course.deleteMany();
        console.log("Data Deleted".red.inverse);
    } catch (error) {
        console.error(error);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}