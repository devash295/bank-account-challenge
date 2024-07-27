/** @jsxImportSource @emotion/react */
import { TransactionType, TransactionStatus } from "../../types/enums";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { customTheme, mediaQueries } from "../../Theme";
import axios from "axios";
import { useState } from "react";
import { currentUser, users } from "../../dummyData/users";

type TransactionModalProps = {
  action: TransactionType;
  isOpen: boolean;
  toggleOpen: () => void;
};

const modalContainer = mediaQueries({
  display: "flex",
  flexDirection: "column",
  width: ["90%", "80%", "60%", "40%"],
  borderRadius: "8px",
  backgroundColor: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const ModalHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "4rem",
  backgroundColor: customTheme.palette.primary.main,
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  color: "white",
});

const ModalBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  alignSelf: "center",
  padding: "20px",
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "20px",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  width: "100%",
  backgroundColor: customTheme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: customTheme.palette.primary.dark,
  },
});

const IBAN_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;

const TransactionModal = (props: TransactionModalProps) => {
  const { action, isOpen, toggleOpen } = props;
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [ibanError, setIbanError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [transactionError, setTransactionError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateTransaction = async () => {
    if (!IBAN_REGEX.test(iban)) {
      setIbanError("Invalid IBAN format.");
      return;
    }

    if (amount === null || amount <= 0 || amount > 5000000) {
      setAmountError(
        "Amount must be greater than 0 and less than or equal to 50000."
      );
      return;
    }

    const usersLength = users.length;
    const statusLength = Object.keys(TransactionStatus).length;

    console.log("Users length:", usersLength);
    console.log("Status length:", statusLength);

    const randomUserIndex = Math.floor(Math.random() * usersLength);
    const randomStatusIndex = Math.floor(Math.random() * statusLength);

    console.log("Random user index:", randomUserIndex);
    console.log("Random status index:", randomStatusIndex);

    const recipient =
      action === TransactionType.WITHDRAW
        ? currentUser
        : users[randomUserIndex];
    const status = Object.values(TransactionStatus)[randomStatusIndex];

    console.log("Recipient:", recipient);
    console.log("Status:", status);

    const transactionData = {
      date: new Date().toISOString(),
      type: action,
      amount: amount,
      status: status,
      from: "SomeAccount", // Replace this with actual sender account if needed
      recipient: recipient,
      iban: iban,
    };
    console.log(transactionData);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transaction/create",
        transactionData
      );
      console.log(response.data);
      toggleOpen();
    } catch (error) {
      console.error("Error creating transaction:", error);
      setTransactionError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={toggleOpen}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <div css={modalContainer} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <Typography
              style={{ marginLeft: "20px", fontWeight: 500, fontSize: "24px" }}
            >
              {action} Money
            </Typography>
            <IconButton onClick={toggleOpen} style={{ marginRight: "20px" }}>
              <CloseIcon css={{ color: "white" }} />
            </IconButton>
          </ModalHeader>
          <ModalBody>
            <InputContainer>
              <Typography variant="body1">Account Number/IBAN</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={iban}
                onChange={(e) => {
                  setIban(e.target.value);
                  setIbanError("");
                }}
                error={!!ibanError}
                helperText={ibanError}
              />
            </InputContainer>
            <InputContainer>
              <Typography variant="body1">Amount</Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                value={amount ?? ""}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setAmountError("");
                }}
                error={!!amountError}
                helperText={amountError}
              />
            </InputContainer>
            {transactionError && (
              <Typography color="error" style={{ paddingBottom: "20px" }}>
                Error creating transaction. Please try again later.
              </Typography>
            )}
            <StyledButton
              variant="contained"
              onClick={handleCreateTransaction}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                action
              )}
            </StyledButton>
          </ModalBody>
        </div>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
