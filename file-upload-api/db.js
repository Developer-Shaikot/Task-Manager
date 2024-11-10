const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const url = process.env.MONGO_URI;
        const con = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${con.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red);
        process.exit(1);
    }
};

module.exports = connectDB;
