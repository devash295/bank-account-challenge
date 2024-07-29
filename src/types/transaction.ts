import { TransactionType } from "./enums";

export type Transaction = {
  _id: string;
  date: string;
  type: TransactionType;
  amount: number;
  from: string;
  recipient: {
    name: string;
    avatar: string;
  };
  iban: string;
  balance: number;
};
