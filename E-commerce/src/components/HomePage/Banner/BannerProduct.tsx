import React from "react";
import { Box, Typography, Button } from "@mui/material";
import banner from "../../../assets/bannerproduct1.jpg";
import { useNavigate } from "react-router-dom";

const BannerProduct: React.FC = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/categories");
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "60vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: { xs: 0, md: 6 },
        overflow: "hidden",
        mb: 4,
      }}
    >
      {/* Overlay for text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(30,58,138,0.7) 60%, rgba(245,158,66,0.7) 100%)",
        }}
      />
      {/* Text content */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          zIndex: 1,
          px: 3,
          width: { xs: "100%", md: "60%" },
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
            letterSpacing: 1,
            mb: 2,
            textShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}
        >
          Khám phá thế giới các đồ dùng công nghệ
        </Typography>
        <Typography
          variant="h6"
          mb={4}
          sx={{
            fontWeight: 500,
            color: "#FDE68A",
            textShadow: "0 2px 8px rgba(30,58,138,0.2)",
          }}
        >
          Chúng tôi ở đây để cung cấp các sản phẩm và đồ dùng công nghệ phù hợp với mong muốn của bạn
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(90deg, #F59E42 0%, #1E3A8A 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 20,
            px: 5,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "0 4px 16px rgba(30,58,138,0.12)",
            transition: "all 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1E3A8A 0%, #F59E42 100%)",
              color: "#fff",
              transform: "scale(1.04)",
            },
          }}
          onClick={handleShopNow}
        >
          Xem sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default BannerProduct;