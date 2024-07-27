import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import TransactionIcon from "../../icons/transactionIcon";
import { TransactionType, TransactionStatus } from "../../../types/enums";
import StatusButton from "./statusButton";
import { Transaction } from "../../../types/transaction";
import CustomPagination from "./customPagination";

type Order = "asc" | "desc";

type EnhancedTableProps = {
  searchQuery: string;
  filterTypes: TransactionType[];
  startDate: Date | null;
  endDate: Date | null;
};

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  searchQuery,
  filterTypes,
  startDate,
  endDate,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Transaction>("date");
  const [rows, setRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10; // Fixed number of rows per page
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const fetchTotalTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transaction/totalTransactions"
        );
        setTotalTransactions(response.data);
      } catch (error) {
        console.error("Error fetching total transactions:", error);
      }
    };

    fetchTotalTransactions();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transaction?page=${
            page + 1
          }&limit=${rowsPerPage}`
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, rowsPerPage]);

  const handleRequestSort = (property: keyof Transaction) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredRows = rows.filter((row) => {
    const matchesType =
      filterTypes.length === 0 || filterTypes.includes(row.type);
    const matchesDateRange =
      (!startDate || new Date(row.date) >= startDate) &&
      (!endDate || new Date(row.date) <= endDate);
    const matchesSearchQuery =
      (row.recipient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row._id?.includes(searchQuery)) ??
      false;

    return matchesType && matchesDateRange && matchesSearchQuery;
  });

  const sortedRows = filteredRows.sort((a, b) => {
    if (orderBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (orderBy === "date") {
      return order === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return order === "asc"
        ? (a[orderBy]?.toString() ?? "").localeCompare(
            b[orderBy]?.toString() ?? ""
          )
        : (b[orderBy]?.toString() ?? "").localeCompare(
            a[orderBy]?.toString() ?? ""
          );
    }
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "_id"}
                direction={orderBy === "_id" ? order : "asc"}
                onClick={() => handleRequestSort("_id")}
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
                <b>Recipient</b>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : "asc"}
                onClick={() => handleRequestSort("amount")}
              >
                <b>Amount</b>
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
            <TableRow key={row._id}>
              <TableCell>#{row._id}</TableCell>
              <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={row.recipient.avatar}
                    alt={row.recipient.name}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      marginRight: 8,
                    }}
                  />
                  {row.recipient.name}
                </div>
              </TableCell>
              <TableCell>${row.amount.toFixed(2)}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {row.type === TransactionType.DEPOSIT ? (
                    <TransactionIcon color="green" />
                  ) : (
                    <TransactionIcon color="red" />
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
      <CustomPagination
        count={totalTransactions}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default EnhancedTable;
