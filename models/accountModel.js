const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    accountSelection: {
      type: [String],
      enum: ["online", "cod"],
      required: true,
    },
    BankName: { type: String },
    AccountTitle: { type: String },
    AccountNo: { type: String },
    iban: { type: String },
  },
  { timestamps: true },
);

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
