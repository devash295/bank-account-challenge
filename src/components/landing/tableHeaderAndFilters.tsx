import { Typography } from "@mui/material";
import styled from "styled-components";
import SearchBar from "./searchbar";
import FilterButton from "./filterButton";
import { TransactionType } from "../../types/enums";

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
type TableHeaderAndFiltersProps = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterTypeChange: (types: TransactionType[]) => void;
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
};

const TableHeaderAndFilters = (props: TableHeaderAndFiltersProps) => {
  return (
    <Container>
      <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
        Transaction History
      </Typography>
      <SearchAndFilterContainer>
        <SearchBar onSearchChange={props.onSearchChange} />
        <FilterButton
          onDateRangeChange={props.onDateRangeChange}
          onFilterTypeChange={props.onFilterTypeChange}
        />
      </SearchAndFilterContainer>
    </Container>
  );
};

export default TableHeaderAndFilters;
