import { Typography } from "@mui/material";
import styled from "styled-components";
import SearchBar from "./searchbar";
import FilterButton from "./filterButton";

const Container = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
const SearchAndFilterContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
});
const TableHeaderAndFilters = () => {
  return (
    <Container>
      <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
        Transaction History
      </Typography>
      <SearchAndFilterContainer>
        <SearchBar />
        <FilterButton />
      </SearchAndFilterContainer>
    </Container>
  );
};

export default TableHeaderAndFilters;
