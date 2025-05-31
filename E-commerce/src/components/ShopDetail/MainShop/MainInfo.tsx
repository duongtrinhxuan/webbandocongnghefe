import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Rating,
  createTheme,
  ThemeProvider,
  Paper,
} from "@mui/material";
import { Shop } from "../../../data/shop";

interface Props {
  shop: Shop;
}

const MainInfo = ({ shop }: Props) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Nunito",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box width="100%">
        {/* Shop Tag */}
        <Paper
          sx={{
            bgcolor: "#1E3A8A",
            display: "inline-block",
            mb: 2,
            px: 2,
            py: 0.5,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(30,58,138,0.08)",
          }}
        >
          <Typography
            variant="subtitle1"
            color="#fff"
            fontWeight={700}
            sx={{ letterSpacing: 1 }}
          >
            SHOP
          </Typography>
        </Paper>
        {/* Shop Name & Status */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontWeight: "800",
              fontSize: { xs: "2rem", md: "2.5rem" },
              mt: 1,
              color: "#1E3A8A",
              letterSpacing: 1,
            }}
          >
            {shop.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                bgcolor: "#2196F3",
                mr: 1,
              }}
            />
          </Box>
        </Box>
        {/* Rating */}
        <Box display="flex" gap={1} alignItems="center" mt={1}>
          <Rating
            value={shop.rating}
            readOnly
            precision={0.5}
            size="medium"
            sx={{
              "& .MuiRating-iconFilled": { color: "#F59E42" },
              "& .MuiRating-iconEmpty": { color: "#F0ECE1" },
            }}
          />
          <Typography fontWeight="bold" fontSize="18px" color="#1E3A8A">
            ({shop.rating})
          </Typography>
          <Typography fontWeight="500" fontSize="16px" color="#C45C00">
            Đánh giá
          </Typography>
        </Box>
        {/* Address */}
        <Typography
          variant="h5"
          color="#E600A0"
          fontWeight="700"
          my={3}
          sx={{ letterSpacing: 1 }}
        >
          Địa chỉ: {shop.address}
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>
    </ThemeProvider>
  );
};

export default MainInfo;