/** @jsxImportSource @emotion/react */
import styled from "styled-components";
import { customTheme, mediaQueries } from "../../../Theme";
import AccountInfo from "./accountInfo";
import TransactionActions from "./transactionActions";

const TopSectionWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  // padding: "0 20px",
});

const topSectionContainer = mediaQueries({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: customTheme.palette.primary.main,
  borderRadius: "8px",
  color: "white",
  width: "100%",
  maxWidth: "1200px", // Optional: Set a max-width to control the width of the content
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "5px 10px",
  marginBottom: "10px",
  gap: ["5px", "20px"], // Add gap between items
});

const AccountInfoWrapper = styled("div")({
  flexGrow: 1, // Allow AccountInfo to grow
  display: "flex",
  justifyContent: "flex-start",
});

const TransactionActionsWrapper = styled("div")({
  flexGrow: 1, // Allow TransactionActions to grow
  display: "flex",
  justifyContent: "flex-end",
});

const TopSection = () => {
  return (
    <TopSectionWrapper>
      <div css={topSectionContainer}>
        <AccountInfoWrapper>
          <AccountInfo />
        </AccountInfoWrapper>
        <TransactionActionsWrapper>
          <TransactionActions />
        </TransactionActionsWrapper>
      </div>
    </TopSectionWrapper>
  );
};

export default TopSection;
