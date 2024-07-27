import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import TransactionIcon from "../../icons/transactionIcon";
import { TransactionStatus } from "../../../types/enums";
import StatusButton from "./statusButton";

interface RowData {
  id: number;
  date: string;
  recipient: string;
  amount: number;
  type: string;
  status: TransactionStatus;
}

// Sample data
const rows: RowData[] = [
  {
    id: 1,
    date: "July 28, 2024, 4:40 PM",
    recipient: "Jordyn",
    amount: 12821.98,
    type: "Debit",
    status: TransactionStatus.COMPLETED,
  },
  {
    id: 2,
    date: "July 28, 2023, 4:50 PM",
    recipient: "Marcus",
    amount: 1228.98,
    type: "Credit",
    status: TransactionStatus.PENDING,
  },
  {
    id: 3,
    date: "July 28, 2024, 4:10 PM",
    recipient: "Jordyn",
    amount: 112328.98,
    type: "Debit",
    status: TransactionStatus.CANCELLED,
  },
  {
    id: 4,
    date: "July 27, 2024, 4:30 PM",
    recipient: "Marcus",
    amount: 12128.98,
    type: "Credit",
    status: TransactionStatus.PENDING,
  },
  // Add more rows as needed
];

type Order = "asc" | "desc";

const EnhancedTable: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof RowData>("date");

  const handleRequestSort = (property: keyof RowData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = rows.sort((a, b) => {
    if (orderBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else {
      return order === "asc"
        ? a[orderBy].toString().localeCompare(b[orderBy].toString())
        : b[orderBy].toString().localeCompare(a[orderBy].toString());
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "id"}
                direction={orderBy === "id" ? order : "asc"}
                onClick={() => handleRequestSort("id")}
              >
                <b>ID Invoice</b>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "asc"}
                onClick={() => handleRequestSort("date")}
              >
                <b>Date</b>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "recipient"}
                direction={orderBy === "recipient" ? order : "asc"}
                onClick={() => handleRequestSort("recipient")}
              >
                <b> Recipient</b>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : "asc"}
                onClick={() => handleRequestSort("amount")}
              >
                <b> Amount</b>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "type"}
                direction={orderBy === "type" ? order : "asc"}
                onClick={() => handleRequestSort("type")}
              >
                <b>Type</b>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : "asc"}
                onClick={() => handleRequestSort("status")}
              >
                <b>Status</b>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>#{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.recipient}</TableCell>
              <TableCell>${row.amount}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {row.type === "Debit" ? (
                    <TransactionIcon color="red" />
                  ) : (
                    <TransactionIcon color="green" />
                  )}
                  <span style={{ marginLeft: "8px" }}>{row.type}</span>
                </div>
              </TableCell>
              <TableCell>
                <StatusButton status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnhancedTable;
