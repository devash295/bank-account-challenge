import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "../icons/searchIcon";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search here..."
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
