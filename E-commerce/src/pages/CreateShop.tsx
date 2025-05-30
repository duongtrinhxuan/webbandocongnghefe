import React, { useEffect, useState } from "react";
import { ShopDetails } from "../data/shopdetail";
import { uploadToFirebase } from "./ChinhSuaSanPham";
import { createShop } from "../services/shopService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthContext";
import { Box, Typography, Paper, Button, InputBase } from "@mui/material";
import Header from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";
export default function CreateShop() {
  const { user } = useAuth();

  const [shop, setShop] = useState<ShopDetails>({
    id: "",
    userId: user?.id || "",
    userName: user?.accountName || "",
    name: "",
    address: "",
    image: "",
    rating: 0,
  });

  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadToFirebase(file);
      setShop((prev) => ({ ...prev, image: url }));
    }
  };

  const create = () => {
    const isEmptyField = Object.entries(shop).some(([key, value]) => {
      if (key === "rating" || key === "id") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    createShop(shop).then(() => {
      nav("/quanlyshop");
    });
  };

  const cancel = () => {
    nav("/profile");
  };

  return (
    <>
      <Header />
      <Box
        minHeight="100vh"
        sx={{
          background: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            background: "#fff",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", textAlign: "center", fontWeight: 700 }}>
            Thêm Shop
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Ảnh minh họa
              </Typography>
              <InputBase
                type="file"
                onChange={handleFileChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
                inputProps={{ accept: "image/*" }}
              />
              {shop.image && (
                <Box mt={1}>
                  <img
                    src={shop.image}
                    alt="Ảnh shop"
                    style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Tên Shop
              </Typography>
              <InputBase
                type="text"
                value={shop.name}
                name="name"
                onChange={handleChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Địa chỉ
              </Typography>
              <InputBase
                type="text"
                value={shop.address}
                name="address"
                onChange={handleChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1E3A8A",
                  color: "#fff",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#155a9c" },
                }}
                onClick={create}
              >
                Thêm Shop
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  color: "#1E3A8A",
                  border: "1px solid #1E3A8A",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#F0ECE1" },
                }}
                onClick={cancel}
              >
                Hủy bỏ
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}