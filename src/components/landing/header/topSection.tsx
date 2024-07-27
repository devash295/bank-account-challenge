import styled from "styled-components";
import { customTheme } from "../../../Theme";

import AccountInfo from "./accountInfo";
import TransactionActions from "./transactionActions";

const TopSectionContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: customTheme.palette.primary.main,
  borderRadius: "8px",
  color: "white",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const TopSection = () => {
  return (
    <TopSectionContainer>
      <AccountInfo />
      <TransactionActions />
    </TopSectionContainer>
  );
};

export default TopSection;
