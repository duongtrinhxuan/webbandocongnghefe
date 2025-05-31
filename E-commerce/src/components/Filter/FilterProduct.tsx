import { Box, createTheme, Grid, ThemeProvider, Paper } from "@mui/material";
import CategoryFilter from "./CategoryFilter";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
    fontWeightRegular: 500,
  },
});

const FilterProduct = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 350,
          mx: "auto",
          mt: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 3,
            p: 2,
            background: "#f9f9f9",
            boxShadow: "0 2px 8px rgba(30,58,138,0.08)",
          }}
        >
          <CategoryFilter />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default FilterProduct;