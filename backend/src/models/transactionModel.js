import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  recipient: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Withdraw", "Deposit", "Transfer"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Completed", "Pending", "Cancelled"],
  },
});

const Transaction = mongoose.model("transactions", TransactionSchema);

export default Transaction;
