const express = require("express");
const bodyParse = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const Cron = require ("./crons/cron");
const app = express();

const tiketRoutes = require ("./routes/ticket.route");

env.config();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

tiketRoutes(app);

app.listen(process.env.PORT, async () => {
  console.log("Notification server started");
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to mongo");
  } catch (error) {
    console.log(error);
  }
  Cron.mailerCron()
});


