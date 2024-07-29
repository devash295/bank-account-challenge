import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  DialogActions,
  Typography,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Dayjs } from "dayjs";

type DateSelectorProps = {
  label: string;
  date: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  date,
  onDateChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClear = () => {
    onDateChange(null);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box onClick={handleOpen} display="flex" alignItems="center">
        <IconButton style={{ paddingLeft: "0" }}>
          <CalendarTodayIcon color={date ? "primary" : "action"} />
        </IconButton>
        <span>{label}</span>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={date}
            onChange={(newValue) => onDateChange(newValue)}
            sx={{
              ".MuiDayCalendar-root": {
                padding: 0,
              },
            }}
          />
        </DialogContent>
        <DialogActions style={{ paddingTop: 0 }}>
          <Button onClick={handleClear} color="inherit">
            Clear
          </Button>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default DateSelector;
