/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Typography } from "@mui/material";
import DepositMoneyIcon from "../../icons/depositMoneyIcon";
import WithdrawMoneyIcon from "../../icons/withdrawMoneyIcon";
import TransferMoneyIcon from "../../icons/transferMoneyIcon";
import { TransactionType } from "../../../types/enums";
import TransactionModal from "../../modal/TransactionModal";
import { mediaQueries } from "../../../Theme";
import useIsMobile from "../../../utils/isMobileHook";

const actionsContainer = mediaQueries({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around", // Space around items
  alignItems: "center",
  borderRadius: "8px",
  width: "100%",
  margin: "5px 10px", // Reduce margin
  gap: ["10px", 0, 0, 0],
});

const ButtonTextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledIconButton = styled(IconButton)({
  maxHeight: "80px",
  maxWidth: "80px",
});

const typographyStyle = mediaQueries({
  fontSize: ["12px", "14px", "16px", "18px"], // Adjust the font sizes as needed
});

const TransactionActions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);
  const isMobile = useIsMobile();
  const handleOpenModal = (type: TransactionType) => {
    setTransactionType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTransactionType(null);
  };

  return (
    <>
      <div css={actionsContainer}>
        <ButtonTextContainer>
          <StyledIconButton
            onClick={() => handleOpenModal(TransactionType.DEPOSIT)}
          >
            <DepositMoneyIcon />
          </StyledIconButton>
          <Typography css={typographyStyle}>
            Deposit {!isMobile && "Money"}
          </Typography>
        </ButtonTextContainer>

        <ButtonTextContainer>
          <StyledIconButton
            onClick={() => handleOpenModal(TransactionType.WITHDRAW)}
          >
            <WithdrawMoneyIcon />
          </StyledIconButton>
          <Typography css={typographyStyle}>
            Withdraw {!isMobile && "Money"}
          </Typography>
        </ButtonTextContainer>

        <ButtonTextContainer>
          <StyledIconButton
            onClick={() => handleOpenModal(TransactionType.TRANSFER)}
          >
            <TransferMoneyIcon />
          </StyledIconButton>
          <Typography css={typographyStyle}>
            Transfer {!isMobile && "Money"}
          </Typography>
        </ButtonTextContainer>
      </div>

      {transactionType && (
        <TransactionModal
          action={transactionType}
          isOpen={openModal}
          toggleOpen={handleCloseModal}
        />
      )}
    </>
  );
};

export default TransactionActions;
