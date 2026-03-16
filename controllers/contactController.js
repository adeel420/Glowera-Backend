const Contact = require("../models/contactModel");
const transporter = require("../config/nodemailer");
const { Contact_User_Template, Contact_Admin_Template } = require("../emailTemplate");

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const contact = new Contact({ firstName, lastName, email, phone, message });
    await contact.save();

    const fullName = `${firstName} ${lastName}`;
    const date = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });

    const userEmailHtml = Contact_User_Template
      .replace(/{name}/g, fullName)
      .replace(/{email}/g, email)
      .replace(/{phone}/g, phone)
      .replace(/{message}/g, message);

    await transporter.sendMail({
      from: `"Glowera Store" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "We received your message - Glowera",
      html: userEmailHtml,
    });

    const adminEmailHtml = Contact_Admin_Template
      .replace(/{name}/g, fullName)
      .replace(/{firstName}/g, firstName)
      .replace(/{email}/g, email)
      .replace(/{phone}/g, phone)
      .replace(/{message}/g, message)
      .replace(/{date}/g, date);

    await transporter.sendMail({
      from: `"Glowera Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Message from ${fullName} - Glowera`,
      html: adminEmailHtml,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
