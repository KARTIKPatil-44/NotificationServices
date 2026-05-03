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


const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to mongodb");

    app.listen(process.env.PORT, () => {
      console.log("Notification server started successfully");
      // sendMail(process.env.EMAIL, process.env.EMAIL_PASS);

    });
  } catch (error) {
    console.log("Not able to connect to mongodb");
  }
  Cron.mailerCron();
};

startServer();
