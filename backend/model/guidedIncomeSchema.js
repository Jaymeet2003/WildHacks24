const mongoose = require("mongoose");

const guidedincomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // References ObjectId
      required: true,
      ref: "users", // This is the name of the collection you're referencing
    },
    yearlyIncome: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 1000000000,
    },
    goal: {
      type: String,
      default: "income",
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const guidedIncomeDB = new mongoose.model("guidedIncomes", guidedincomeSchema);

module.exports = guidedIncomeDB;
