import { TransactionType, TransactionStatus } from "./enums";

export type Transaction = {
  _id: string;
  date: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  from: string;
  recipient: {
    name: string;
    avatar: string;
  };
  iban: string;
};
