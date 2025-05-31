import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Box, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useProductStore from "../../zustand/useProductStore";

const SearchFilter = () => {
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const [query, setQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery);
  };

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "95vw", sm: 500, md: 600 },
          px: 2,
          py: 1,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
          background: "#fff",
        }}
      >
        <TextField
          label="Tìm sản phẩm ..."
          variant="outlined"
          value={query}
          onChange={handleSearchChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "#F0ECE1",
            },
            "& .MuiInputLabel-root": {
              fontWeight: 600,
              color: "#1E3A8A",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearch}
                  sx={{
                    color: "#1E3A8A",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};

export default SearchFilter;