require("dotenv").config(
  process.env.NODE_ENV === "dev"
    ? { path: "./envs/dev.env" }
    : { path: "./envs/default.env" }
);
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/contactsRouter.js");
const serverConfig = require("./configs/serverConfig.js");

console.log(`Running in ${process.env.NODE_ENV ?? "defaut"} mode.`);

mongoose
  .connect(serverConfig.mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(serverConfig.port, () => {
  console.log(`Server is running. Use our API on port: ${serverConfig.port}`);
});
