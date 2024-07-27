import { Button } from "@mui/material";
import { customTheme } from "../../../Theme";
import { TransactionStatus } from "../../../types/enums";

const StatusButton = (props: { status: TransactionStatus }) => {
  const color =
    props.status === TransactionStatus.COMPLETED
      ? customTheme.palette.secondary.main
      : props.status === TransactionStatus.CANCELLED
      ? customTheme.palette.secondary.dark
      : customTheme.palette.secondary.light;
  return (
    <Button
      variant="outlined"
      style={{
        fontSize: 12,
        minWidth: "100px",
        maxWidth: "100px",
        borderRadius: 10,
        border: `1px solid ${color}`,
        color: color,
      }}
    >
      {props.status}
    </Button>
  );
};

export default StatusButton;
