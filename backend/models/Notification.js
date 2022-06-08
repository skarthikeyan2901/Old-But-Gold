const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "user",
  },
  message: String,
  notificationType: String,
  notificationDate: Date,
});

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification;