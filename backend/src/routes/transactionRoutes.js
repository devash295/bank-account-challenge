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

// Utility function to parse query parameters
const parseQueryParams = (query) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "date",
    order = "desc",
    type,
    startDate,
    endDate,
    searchQuery,
  } = query;

  let parsedQuery = {};

  if (type) {
    const typesArray = type.split(","); // Split the type string into an array
    parsedQuery.type = { $in: typesArray };
  }

  if (startDate || endDate) {
    parsedQuery.date = {};
    if (startDate) parsedQuery.date.$gte = new Date(startDate);
    if (endDate) parsedQuery.date.$lte = new Date(endDate);
  }

  if (searchQuery) {
    parsedQuery["recipient.name"] = { $regex: searchQuery, $options: "i" };
  }

  return {
    page: Number(page),
    limit: Number(limit),
    orderBy,
    order,
    query: parsedQuery,
  };
};

// Get filtered, searched, and paginated transactions
transactionRouter.get("/", (req, res) => {
  const { page, limit, orderBy, order, query } = parseQueryParams(req.query);

  Transaction.find(query)
    .sort({ [orderBy]: order === "desc" ? -1 : 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((transactions) => {
      if (transactions.length === 0) {
        return res
          .status(404)
          .json({ noTransactionsFound: "No transactions found" });
      }
      res.json(transactions);
    })
    .catch((err) =>
      res.status(500).json({ error: "Error fetching transactions" })
    );
});

// Get total number of filtered and searched transactions
transactionRouter.get("/totalTransactions", (req, res) => {
  const { query } = parseQueryParams(req.query);

  Transaction.countDocuments(query)
    .then((count) => res.json(count))
    .catch((err) => res.status(404).json(err));
});

//Get total amount of money, if type is withdraw or transfer it should be subtracted from total, if its deposit it should be added
transactionRouter.get("/totalAmount", (req, res) => {
  Transaction.aggregate([
    {
      $match: { status: "Completed" },
    },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: {
            $switch: {
              branches: [
                { case: { $eq: ["$type", "Deposit"] }, then: "$amount" },
                {
                  case: { $eq: ["$type", "Withdraw"] },
                  then: { $subtract: [0, "$amount"] },
                },
                {
                  case: { $eq: ["$type", "Transfer"] },
                  then: { $subtract: [0, "$amount"] },
                },
              ],
              default: 0,
            },
          },
        },
      },
    },
  ])
    .then((totalAmount) => res.json(totalAmount[0]?.totalAmount ?? 0))
    .catch((err) => res.status(404).json(err));
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
