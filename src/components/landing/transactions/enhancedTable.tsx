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

interface RowData {
  id: number;
  date: string;
  recipient: string;
  amount: number;
  type: string;
  status: string;
}

// Sample data
const rows: RowData[] = [
  {
    id: 1,
    date: "July 28, 2024, 4:40 PM",
    recipient: "Jordyn",
    amount: 128.98,
    type: "Outcome",
    status: "Canceled",
  },
  {
    id: 2,
    date: "July 28, 2024, 4:40 PM",
    recipient: "Marcus",
    amount: 128.98,
    type: "Income",
    status: "Pending",
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
                ID Invoice
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "asc"}
                onClick={() => handleRequestSort("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "recipient"}
                direction={orderBy === "recipient" ? order : "asc"}
                onClick={() => handleRequestSort("recipient")}
              >
                Recipient
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : "asc"}
                onClick={() => handleRequestSort("amount")}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "type"}
                direction={orderBy === "type" ? order : "asc"}
                onClick={() => handleRequestSort("type")}
              >
                Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : "asc"}
                onClick={() => handleRequestSort("status")}
              >
                Status
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.recipient}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {row.type === "Outcome" ? (
                    <TransactionIcon color="red" />
                  ) : (
                    <TransactionIcon color="green" />
                  )}
                  <span style={{ marginLeft: "8px" }}>{row.type}</span>
                </div>
              </TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnhancedTable;
