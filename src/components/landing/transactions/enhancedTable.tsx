import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableSortLabel,
  CircularProgress,
  styled,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
import TransactionIcon from "../../icons/transactionIcon";
import { TransactionType } from "../../../types/enums";
import { Transaction } from "../../../types/transaction";
import CustomPagination from "./customPagination";

type Order = "asc" | "desc";

type EnhancedTableProps = {
  searchQuery: string;
  filterTypes: TransactionType[];
  startDate: Date | null;
  endDate: Date | null;
};

export const StyledTableRow = styled(TableRow)({
  padding: "4px 8px",
});

export const StyledTableCell = styled(TableCell)({
  padding: "8px 8px",
});

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  searchQuery,
  filterTypes,
  startDate,
  endDate,
}) => {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Transaction>("date");
  const [rows, setRows] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10; // Fixed number of rows per page
  const [totalTransactions, setTotalTransactions] = useState(0);

  const fetchTotalTransactions = async (
    type?: TransactionType[],
    startDate?: Date | null,
    endDate?: Date | null,
    searchQuery?: string
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transaction/totalTransactions",
        {
          params: {
            type: type?.join(","),
            startDate,
            endDate,
            searchQuery,
          },
        }
      );
      setTotalTransactions(response.data);
    } catch (error) {
      console.error("Error fetching total transactions:", error);
    }
  };

  const fetchTransactions = async (
    page: number,
    rowsPerPage: number,
    orderBy: keyof Transaction,
    order: Order,
    type?: TransactionType[],
    startDate?: Date | null,
    endDate?: Date | null,
    searchQuery?: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transaction/",
        {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            orderBy,
            order,
            type: type?.join(","),
            startDate,
            endDate,
            searchQuery,
          },
        }
      );
      console.log("Fetched transactions:", response.data);
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalTransactions(filterTypes, startDate, endDate, searchQuery);
    fetchTransactions(
      page,
      rowsPerPage,
      orderBy,
      order,
      filterTypes,
      startDate,
      endDate,
      searchQuery
    );
  }, [
    page,
    rowsPerPage,
    order,
    orderBy,
    filterTypes,
    startDate,
    endDate,
    searchQuery,
  ]);

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
      row.recipient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      false;
    return matchesType && matchesDateRange && matchesSearchQuery;
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "_id"}
                  direction={orderBy === "_id" ? order : "asc"}
                  onClick={() => handleRequestSort("_id")}
                >
                  <b>Transaction ID</b>
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                >
                  <b>Date</b>
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "recipient"}
                  direction={orderBy === "recipient" ? order : "asc"}
                  onClick={() => handleRequestSort("recipient")}
                >
                  <b>Recipient</b>
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>
                  <b>Credit</b>
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>
                  <b>Debit</b>
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "type"}
                  direction={orderBy === "type" ? order : "asc"}
                  onClick={() => handleRequestSort("type")}
                >
                  <b>Type</b>
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>
                  <b>Balance</b>
                </TableSortLabel>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>#{row._id}</StyledTableCell>
                <StyledTableCell>
                  {new Date(row.date).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>
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
                </StyledTableCell>
                <StyledTableCell>
                  {row.type !== TransactionType.DEPOSIT &&
                    `$${row.amount.toFixed(2)}`}
                </StyledTableCell>
                <StyledTableCell>
                  {row.type === TransactionType.DEPOSIT &&
                    `$${row.amount.toFixed(2)}`}
                </StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {row.type === TransactionType.DEPOSIT ? (
                      <TransactionIcon color="green" />
                    ) : (
                      <TransactionIcon color="red" />
                    )}
                    <span style={{ marginLeft: "8px" }}>{row.type}</span>
                  </div>
                </StyledTableCell>
                <StyledTableCell>${row.balance}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={totalTransactions}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default EnhancedTable;
