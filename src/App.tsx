import React, { useState } from "react";
import TopSection from "./components/landing/header/topSection";
import TableHeaderAndFilters from "./components/landing/tableHeaderAndFilters";
import EnhancedTable from "./components/landing/transactions/enhancedTable";
import { TransactionType } from "./types/enums";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTypes, setFilterTypes] = useState<TransactionType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterTypeChange = (types: TransactionType[]) => {
    setFilterTypes(types);
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: "80vw",
          maxWidth: "80vw",
          maxHeight: "100%",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TopSection />
        <TableHeaderAndFilters
          onSearchChange={handleSearchChange}
          onFilterTypeChange={handleFilterTypeChange}
          onDateRangeChange={handleDateRangeChange}
        />
        <EnhancedTable
          searchQuery={searchQuery}
          filterTypes={filterTypes}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}

export default App;
