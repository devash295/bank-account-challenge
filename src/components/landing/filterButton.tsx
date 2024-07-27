import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FilterIcon from "../icons/filterIcon";
import { TransactionType } from "../../types/enums";
import DateSelector from "./dateSelector";
import dayjs, { Dayjs } from "dayjs";

type FilterButtonProps = {
  onFilterTypeChange: (types: TransactionType[]) => void;
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  onFilterTypeChange,
  onDateRangeChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeChange = (type: TransactionType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    onFilterTypeChange(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    );
  };

  const handleDateRangeChange = (start: Dayjs | null, end: Dayjs | null) => {
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(start ? start.toDate() : null, end ? end.toDate() : null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedTypes.includes(TransactionType.DEPOSIT)}
                onChange={() => handleTypeChange(TransactionType.DEPOSIT)}
              />
            }
            label="Deposits"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedTypes.includes(TransactionType.WITHDRAW)}
                onChange={() => handleTypeChange(TransactionType.WITHDRAW)}
              />
            }
            label="Withdrawals"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedTypes.includes(TransactionType.TRANSFER)}
                onChange={() => handleTypeChange(TransactionType.TRANSFER)}
              />
            }
            label="Transfers"
          />
        </MenuItem>
        <MenuItem>
          <DateSelector
            label="Start Date"
            date={startDate}
            onDateChange={(date) => handleDateRangeChange(date, endDate)}
          />
        </MenuItem>
        <MenuItem>
          <DateSelector
            label="End Date"
            date={endDate}
            onDateChange={(date) => handleDateRangeChange(startDate, date)}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterButton;
