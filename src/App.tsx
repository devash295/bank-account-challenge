import React, { useState } from "react";

import TopSection from "./components/landing/header/topSection";
import TableHeaderAndFilters from "./components/landing/tableHeaderAndFilters";
import EnhancedTable from "./components/landing/transactions/enhancedTable";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(false);
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
        <TableHeaderAndFilters />
        <EnhancedTable />
        {/* <TransactionIcon color="red" />
      <TransactionIcon color="green" />
      <TransferMoneyIcon />
      <WithdrawMoneyIcon />
      <DepositMoneyIcon />
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      <TransactionModal
        action={TransactionType.DEPOSIT}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      /> */}
      </div>
    </div>
  );
}

export default App;
