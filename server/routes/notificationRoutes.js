const express = require("express");
const router = express.Router();

const {
getNotifications,
markAsRead,
getUnreadCount
} = require("../controllers/notificationController");

const {
protect,
authorize
} = require("../middleware/authMiddleware");

router.get(
"/",
protect,
authorize("student"),
getNotifications
);

router.put(
"/:id",
protect,
authorize("student"),
markAsRead
);

router.get(
"/count",
protect,
authorize("student"),
getUnreadCount
);

module.exports = router;