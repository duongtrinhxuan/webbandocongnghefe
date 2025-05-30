import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { ShopDetails } from "../data/shopdetail";
import { useNavigate } from "react-router-dom";
import { deleteshop, fetchShopDetails, getShopId } from "../services/shopService";
import { useAuth } from '../components/Auth/AuthContext';
import { Box, Typography, Paper, Button } from "@mui/material";

export default function QuanLyThongTin() {
  const { user: authUser } = useAuth();
  const [shopDetail, setShopDetail] = useState<ShopDetails>();
  const nav = useNavigate();

  //Call api getShop
  useEffect(() => {
    if (authUser?.id) {
      getShopId(authUser.id).then((shopId: string) => {
        fetchShopDetails(shopId).then((data) => {
          setShopDetail(data);
        });
      });
    }
  }, [authUser]);

  const editHandle = () => {
    nav(`/quanlyshop/QuanLyThongTin/edit`);
  };

  //Call api deleteShop
  const DeleteShop = () => {
    if (authUser?.id) {
      getShopId(authUser.id).then((shopId: string) => {
        deleteshop(shopId).then(() => {
          nav("/quanlyshop");
        });
      });
    }
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
            maxWidth: 400,
            p: 4,
            borderRadius: 3,
            background: "#fff",
            boxSizing: "border-box",
            textAlign: "center"
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", fontWeight: 700 }}>
            Thông tin cửa hàng
          </Typography>
          <Box mb={2}>
            <img
              className="w-full h-40 object-contain rounded-t-lg"
              alt={shopDetail?.name}
              src={shopDetail?.image}
              style={{ width: "100%", height: 160, objectFit: "contain", borderRadius: 8, background: "#f5f5f5" }}
            />
          </Box>
          <Box mb={2} textAlign="left">
            <Typography fontWeight={600} mb={0.5}>Tên cửa hàng:</Typography>
            <Typography color="text.secondary" mb={1}>{shopDetail?.name}</Typography>
            <Typography fontWeight={600} mb={0.5}>Địa chỉ:</Typography>
            <Typography color="text.secondary">{shopDetail?.address}</Typography>
          </Box>
          <Box display="flex" gap={2} justifyContent="center" mt={3}>
            <Button
              onClick={editHandle}
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
              Thay đổi
            </Button>
            <Button
              onClick={DeleteShop}
              variant="contained"
              sx={{
                backgroundColor: "#ef4444",
                color: "#fff",
                borderRadius: "8px",
                textTransform: "none",
                px: 4,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#dc2626" },
              }}
            >
              Xóa cửa hàng
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}