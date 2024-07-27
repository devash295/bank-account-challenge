import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "../icons/searchIcon";
type SearchBarProps = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchBar = (props: SearchBarProps) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search here..."
      onChange={props.onSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "white",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E0E0E0",
          },
          "&:hover fieldset": {
            borderColor: "#BDBDBD",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#9E9E9E",
          },
        },
        width: "300px", // Adjust the width as needed
      }}
    />
  );
};

export default SearchBar;
