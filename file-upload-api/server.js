const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const upload = require("./upload");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected".cyan.underline))
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

const attachmentSchema = new mongoose.Schema({
    name: String,
    type: String,
    path: String,
    date: { type: Date, default: Date.now },
});
const Attachment = mongoose.model("Attachment", attachmentSchema);

app.post("/upload", upload.array("files"), async (req, res) => {
    try {
        const files = req.files.map((file) => ({
            name: file.originalname,
            type: file.mimetype,
            path: file.path,
        }));
        const attachments = await Attachment.insertMany(files);
        res.status(201).json({ success: true, attachments });
    } catch (error) {
        console.error("File upload failed:", error);
        res.status(500).json({ error: "File upload failed." });
    }
});

app.get("/attachments", async (req, res) => {
    try {
        const attachments = await Attachment.find();
        res.json(attachments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch attachments." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
