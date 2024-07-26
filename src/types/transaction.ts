import { TransactionType, TransactionStatus } from "./enums";

export type Transaction = {
    id: string;
    date: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    from: string;
    recipient: {
        name: string;
        avatar: string;
    }
}