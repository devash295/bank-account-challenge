import express from "express";
import {
  createTransaction,
  getTransactions,
  getTotalTransactions,
  getTotalAmount,
  searchTransactions,
} from "../controllers/transactionController";

const transactionRouter = express.Router();

transactionRouter.post("/create", createTransaction);
transactionRouter.get("/", getTransactions);
transactionRouter.get("/totalTransactions", getTotalTransactions);
transactionRouter.get("/totalAmount", getTotalAmount);
transactionRouter.post("/search", searchTransactions);

export default transactionRouter;
