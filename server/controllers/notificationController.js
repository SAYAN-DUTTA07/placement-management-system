const Notification = require("../models/Notification");
const Student = require("../models/Student");

exports.getNotifications = async (req, res) => {

  try {

    const student = await Student.findOne({
      user: req.user.id
    });

    const notifications = await Notification.find({
      student: student._id
    }).sort({ createdAt: -1 });

    res.json(notifications);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.markAsRead = async (req, res) => {

  try {

    const notification = await Notification.findByIdAndUpdate(

      req.params.id,

      {
        isRead: true
      },

      {
        new: true
      }

    );

    res.json(notification);

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getUnreadCount = async (req, res) => {

  try {

    const student = await Student.findOne({
      user: req.user.id
    });

    const count = await Notification.countDocuments({

      student: student._id,
      isRead: false

    });

    res.json({
      count
    });

  }
  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};