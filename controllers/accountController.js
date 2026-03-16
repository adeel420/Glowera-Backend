const Account = require("../models/accountModel");

// Get current settings (always single document)
exports.get = async (req, res) => {
  try {
    const account = await Account.findOne();
    res.status(200).json({ data: account });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Save / Update settings (upsert - single document)
exports.save = async (req, res) => {
  try {
    const { accountSelection, BankName, AccountTitle, AccountNo, iban } = req.body;

    if (!accountSelection || accountSelection.length === 0) {
      return res.status(400).json({ error: "Please select at least one payment method" });
    }

    const account = await Account.findOneAndUpdate(
      {},
      { accountSelection, BankName, AccountTitle, AccountNo, iban },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Settings saved successfully", data: account });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
