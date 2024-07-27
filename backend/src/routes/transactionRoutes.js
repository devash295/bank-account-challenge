import express from "express";
import Transaction from "../models/transactionModel.js";

const transactionRouter = express.Router();

// Create a transaction
transactionRouter.post("/create", (req, res) => {
  const newTransaction = new Transaction({
    date: req.body.date,
    recipient: req.body.recipient,
    amount: req.body.amount,
    type: req.body.type,
    status: req.body.status,
  });

  newTransaction
    .save()
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).json(err));
});

// Get all transactions
transactionRouter.get("/", (req, res) => {
  Transaction.find()
    .sort({ date: -1 })
    .then((transactions) => res.json(transactions))
    .catch((err) =>
      res.status(404).json({ noTransactionsFound: "No transactions found" })
    );
});

// Search transactions
transactionRouter.post("/search", (req, res) => {
  const { type, startDate, endDate } = req.body;
  let query = {};

  if (type) {
    query.type = type;
  }

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  Transaction.find(query)
    .sort({ date: -1 })
    .then((transactions) => res.json(transactions))
    .catch((err) =>
      res.status(404).json({ noTransactionsFound: "No transactions found" })
    );
});

export default transactionRouter;
