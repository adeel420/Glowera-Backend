const NewsLetter = require("../models/NewsLetterModel");
const transporter = require("../config/nodemailer");
const { Newsletter_Subscription_Template, Newsletter_Admin_Template } = require("../emailTemplate");

exports.create = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await NewsLetter.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "This email is already subscribed" });
    }

    const news = new NewsLetter({ email });
    await news.save();

    const date = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });
    const totalCount = await NewsLetter.countDocuments();

    // Email to User (confirmation)
    const userEmailHtml = Newsletter_Subscription_Template
      .replace(/{email}/g, email);

    await transporter.sendMail({
      from: `"Glowera Store" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "You're subscribed to Glowera Newsletter! 💌",
      html: userEmailHtml,
    });

    // Email to Admin (notification)
    const adminEmailHtml = Newsletter_Admin_Template
      .replace(/{email}/g, email)
      .replace(/{date}/g, date)
      .replace(/{totalCount}/g, totalCount);

    await transporter.sendMail({
      from: `"Glowera Newsletter" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Newsletter Subscriber - ${email}`,
      html: adminEmailHtml,
    });

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await NewsLetter.find().sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    await NewsLetter.findByIdAndDelete(id);
    res.status(200).json({ message: "Subscriber removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
