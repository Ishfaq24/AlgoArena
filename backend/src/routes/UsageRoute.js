const express = require("express");
const cors = require("cors");

const usageRoutes = require("./routes/usage.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usage", usageRoutes);

module.exports = app;
