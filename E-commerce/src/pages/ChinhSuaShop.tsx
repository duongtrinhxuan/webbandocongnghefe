import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { ShopDetails } from "../data/shopdetail";
import { editShop, fetchShopDetails, getShopId } from "../services/shopService";
import { uploadToFirebase } from "./ChinhSuaSanPham";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/Auth/AuthContext';
import { Box, Typography, Paper, Button, InputBase } from "@mui/material";

export default function ChinhSuaShop() {
  const { user } = useAuth();
  const [shopDetail, setShopDetail] = useState<ShopDetails>({
    id: "",
    userId: "",
    userName: "",
    name: "",
    address: "",
    image: "",
    rating: 0,
  });

  const nav = useNavigate();

  useEffect(() => {
    if (user?.id) {
      getShopId(user.id).then((shopId: string) => {
        fetchShopDetails(shopId).then((data) => {
          setShopDetail(data);
        });
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopDetail((prev) => ({
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
      setShopDetail((prev) => ({ ...prev, image: url }));
    }
  };

  const handleCancel = () => {
    nav('/quanlyshop/QuanLyThongTin');
  };

  const edit = (event: React.FormEvent) => {
    event.preventDefault();
    const isEmptyField = Object.entries(shopDetail).some(([key, value]) => {
      if (key === "rating" || key === "userName") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    editShop(shopDetail).then(() => {
      nav('/quanlyshop/QuanLyThongTin');
    });
  };

  return (
    <Box className="flex w-screen" sx={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <DashboardNav />
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ py: 6 }}
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
            Chỉnh sửa thông tin cửa hàng
          </Typography>
          <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={edit}>
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
              {shopDetail.image && (
                <Box mt={1}>
                  <img
                    src={shopDetail.image}
                    alt="Ảnh shop"
                    style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Tên cửa hàng
              </Typography>
              <InputBase
                type="text"
                name="name"
                value={shopDetail.name}
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
                Địa chỉ cửa hàng
              </Typography>
              <InputBase
                type="text"
                name="address"
                value={shopDetail.address}
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
                type="submit"
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
              >
                Cập nhật
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
                onClick={handleCancel}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}