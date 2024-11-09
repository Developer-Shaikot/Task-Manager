const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("*", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const attachmentSchema = new mongoose.Schema({
    name: String,
    type: String,
    date: { type: Date, default: Date.now },
});

const Attachment = mongoose.model("Attachment", attachmentSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/upload", upload.array("files"), async (req, res) => {
    try {
        const files = req.files.map((file) => ({
            name: file.originalname,
            type: file.mimetype,
        }));
        await Attachment.insertMany(files);
        res.status(201).json({ success: true, files });
    } catch (error) {
        res.status(500).json({ error: "File upload failed." });
    }
});

app.get("/attachments", async (req, res) => {
    const attachments = await Attachment.find();
    res.json(attachments);
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
