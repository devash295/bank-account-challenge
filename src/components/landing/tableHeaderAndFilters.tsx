/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import styled from "styled-components";
import SearchBar from "./searchbar";
import FilterButton from "./filterButton";
import { TransactionType } from "../../types/enums";
import { mediaQueries } from "../../Theme";
import useIsMobile from "../../utils/isMobileHook";

const container = mediaQueries({
  display: "flex",
  flexDirection: ["column", "row"],
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
  const isMobile = useIsMobile();
  return (
    <div css={container}>
      <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
        Transaction History
      </Typography>
      <SearchAndFilterContainer
        style={{ maxWidth: isMobile ? "80vw" : "initial" }}
      >
        <SearchBar onSearchChange={props.onSearchChange} />
        <FilterButton
          onDateRangeChange={props.onDateRangeChange}
          onFilterTypeChange={props.onFilterTypeChange}
        />
      </SearchAndFilterContainer>
    </div>
  );
};

export default TableHeaderAndFilters;
