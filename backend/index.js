const express = require("express");
const mainRouter = require("./routes/index");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
const PORT = process.env.PORT || 3000;

main().catch(err => console.log("Error connecting to MongoDB:", err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
}

// Basic route to confirm server setup
app.get("/", (req, res) => {
    res.send("Server is running and connected to MongoDB!");
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
