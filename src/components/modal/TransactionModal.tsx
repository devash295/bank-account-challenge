/** @jsxImportSource @emotion/react */
import { TransactionType } from "../../types/enums";
import {
  Box,
  Input,
  Modal,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { customTheme, mediaQueries } from "../../Theme";

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

const TransactionModal = (props: TransactionModalProps) => {
  const { action, isOpen, toggleOpen } = props;
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
              <TextField variant="outlined" fullWidth></TextField>
            </InputContainer>
            <InputContainer>
              <Typography variant="body1">Amount</Typography>
              <TextField variant="outlined" fullWidth></TextField>
            </InputContainer>
            <StyledButton variant="contained">{action}</StyledButton>
          </ModalBody>
        </div>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
