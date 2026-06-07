const cron = require("node-cron");
const Ticket = require("../models/ticketNotification");
const Mailer = require("../services/email.service");

const mailerCron = () => {
  const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);
  cron.schedule("*/2 * * * *", async () => {
    console.log("Executing cron again");
    const notificationsToBeSent = await Ticket.find({
      status: "PENDING",
    });

    notificationsToBeSent.forEach((notification) => {
      console.log("Notification ID:", notification._id);
      console.log("Recipients:", notification.recepientEmails);
      const mailData = {
        from:process.env.EMAIL,
        to: notification.recepientEmails,
        subject: notification.subject,
        text: notification.content,
      };
      mailer.sendMail(mailData, async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          const savedNotification = await Ticket.findOne({
            _id: notification._id,
          });
          savedNotification.status = "SUCCESS";
          await savedNotification.save();
        }
      });
    });
  });
};

module.exports = {
  mailerCron,
};
