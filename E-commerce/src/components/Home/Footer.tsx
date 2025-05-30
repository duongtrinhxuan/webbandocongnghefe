"use client"
import React from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  createTheme,
  ThemeProvider,
  IconButton
} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from "../../assets/logosecondhand.png"; // Đảm bảo đường dẫn chính xác

const customTheme = createTheme({
  palette: {
    primary: { main: "#1E3A8A" },
    secondary: { main: "#F59E42" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#ffffff" }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: { fontWeight: 700, fontSize: "1.25rem" }
  }
});

const Footer = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          background: "linear-gradient(90deg, #1E3A8A 0%, #F59E42 100%)",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {/* Logo và Tên thương hiệu giống NavBar */}
            <Box display="flex" alignItems="center" gap={1}>
              <img src={logo} alt="Brand Logo" style={{ height: "50px", borderRadius: "8px" }} />
              <Typography variant="h6" sx={{ color: "#ffffff" }}>
                SecondHand
              </Typography>
            </Box>
            {/* Các liên kết thông tin */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="#" underline="none" sx={{ color: "#ffffff", fontWeight: 500 }}>
                Chính sách bảo mật
              </Link>
              <Link href="#" underline="none" sx={{ color: "#ffffff", fontWeight: 500 }}>
                Điều khoản &amp; Điều kiện
              </Link>
            </Box>
            {/* Các icon mạng xã hội */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: "#ffffff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://www.youtube.com" target="_blank" sx={{ color: "#ffffff" }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: "#ffffff" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body2" align="center" sx={{ color: "#ffffff" }}>
            ©2024 SecondHand. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;