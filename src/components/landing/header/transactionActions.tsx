import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Typography } from "@mui/material";
import DepositMoneyIcon from "../../icons/depositMoneyIcon";
import WithdrawMoneyIcon from "../../icons/withdrawMoneyIcon";
import TransferMoneyIcon from "../../icons/transferMoneyIcon";
import { TransactionType } from "../../../types/enums";
import TransactionModal from "../../modal/TransactionModal";

const ActionsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderRadius: "8px",
  width: "60%",
  margin: "10px 30px",
});

const ButtonTextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

const StyledIconButton = styled(IconButton)({
  maxHeight: "120px",
  maxWidth: "120px",
});

const TransactionActions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

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
      <ActionsContainer>
        <ButtonTextContainer>
          <StyledIconButton
            onClick={() => handleOpenModal(TransactionType.DEPOSIT)}
          >
            <DepositMoneyIcon />
          </StyledIconButton>
          <Typography>Deposit Money</Typography>
        </ButtonTextContainer>

        <ButtonTextContainer>
          <StyledIconButton
            onClick={() => handleOpenModal(TransactionType.WITHDRAW)}
          >
            <WithdrawMoneyIcon />
          </StyledIconButton>
          <Typography>Withdraw Money</Typography>
        </ButtonTextContainer>

        <ButtonTextContainer>
          <StyledIconButton
            onClick={() => handleOpenModal(TransactionType.TRANSFER)}
          >
            <TransferMoneyIcon />
          </StyledIconButton>
          <Typography>Transfer Money</Typography>
        </ButtonTextContainer>
      </ActionsContainer>

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
