const express = require("express");
const router = express.Router();
const Notification = require("./../models/Notification");

router.get("/getNotifications", async (req, res) => {
    console.log(req.query.user)
    await Notification.find({ userId: req.query.user }).sort({ "notificationDate": -1 })
    .then((notif) => {
        res.json({notif})
    })
})

module.exports = router;