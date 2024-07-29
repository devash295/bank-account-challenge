import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/transactionModel";

// Create a transaction
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const latestTransaction = await Transaction.findOne().sort({ date: -1 });

    let newBalance = 0;
    if (latestTransaction) {
      newBalance = latestTransaction.balance;
    }
    if (req.body.type === "Deposit") {
      newBalance += req.body.amount;
    } else if (req.body.type === "Withdraw" || req.body.type === "Transfer") {
      newBalance -= req.body.amount;
    }

    const newTransaction: ITransaction = new Transaction({
      date: req.body.date,
      recipient: req.body.recipient,
      amount: req.body.amount,
      type: req.body.type,
      balance: newBalance,
    });
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Utility function to parse query parameters
const parseQueryParams = (query: any) => {
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

  let parsedQuery: any = {};

  if (type) {
    const typesArray = type.split(","); // Split the type string into an array
    parsedQuery.type = { $in: typesArray };
  }

  if (startDate || endDate) {
    parsedQuery.date = {};
    if (startDate) parsedQuery.date.$gte = new Date(startDate);
    if (endDate) {
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999); // Set to end of the day
      parsedQuery.date.$lte = adjustedEndDate;
    }
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
export const getTransactions = (req: Request, res: Response): void => {
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
};

// Get total number of filtered and searched transactions
export const getTotalTransactions = (req: Request, res: Response): void => {
  const { query } = parseQueryParams(req.query);

  Transaction.countDocuments(query)
    .then((count) => res.json(count))
    .catch((err) => res.status(404).json(err));
};

// Get total amount of money
export const getTotalAmount = (req: Request, res: Response): void => {
  Transaction.aggregate([
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
};

// Search transactions
export const searchTransactions = (req: Request, res: Response): void => {
  const { type, startDate, endDate } = req.body;
  let query: any = {};

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
};
