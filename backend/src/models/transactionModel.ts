import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  date: Date;
  recipient: {
    name: string;
    avatar: string;
  };
  amount: number;
  type: "Withdraw" | "Deposit" | "Transfer";
  balance: number;
}

const TransactionSchema: Schema = new Schema({
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
  balance: { type: Number, required: true },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export default Transaction;
