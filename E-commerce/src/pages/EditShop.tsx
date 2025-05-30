import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { ShopDetails } from "../data/shopdetail";
import { editShop, getShop } from "../services/shopService";
import { uploadToFirebase } from "./ChinhSuaSanPham";
import { Box, Typography, Paper, Button, InputBase } from "@mui/material";

export default function EditShop() {
  const [shop, setShop] = useState<ShopDetails>({
    id: "",
    userId: "",
    userName: "",
    name: "",
    address: "",
    image: "",
    rating: 0,
  });
  const nav = useNavigate();
  const { id: shopId } = useParams();

  useEffect(() => {
    getShop(shopId as string).then((data) => {
      setShop({
        id: data.id,
        userId: data.userId,
        userName: "",
        name: data.name,
        address: data.address,
        image: data.image,
        rating: data.rating,
      });
    });
  }, []);

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

  const edit = () => {
    const isEmptyField = Object.entries(shop).some(([key, value]) => {
      if (key === "rating" || key === "userName") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    editShop(shop).then(() => {
      nav("/admin/QuanLyShop");
    });
  };

  const cancel = () => {
    nav("/admin/QuanLyShop");
  };

  return (
    <Box className="flex w-screen">
      <AdminNav />
      <Box
        flex={1}
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ background: "#f9f9f9" }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            background: "#fff",
            mt: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", textAlign: "center" }}>
            Chỉnh sửa Shop
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
                  "&:hover": { backgroundColor: "#155a9c" },
                }}
                onClick={edit}
              >
                Chỉnh sửa
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
    </Box>
  );
}