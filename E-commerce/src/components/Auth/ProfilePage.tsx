import  { useState, useEffect } from 'react';
import { getShopByUserId } from '../../services/shopService';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Avatar
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shop } from '../../data/shop';

const SIDEBAR_COLOR = "#16a34a"; // xanh lá nổi bật

export default function ProfilePage() {
  const { user } = useAuth();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getShopByUserId(user.id)
        .then((fetchedShop) => setShop(fetchedShop))
        .catch((err) => console.error('Lỗi khi fetch dữ liệu shop:', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Bạn chưa đăng nhập.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="flex w-screen" sx={{ background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Sidebar tab màu xanh lá nổi bật */}
      <Box
        sx={{
          width: 320, // Kéo dài thanh tab ra
          background: SIDEBAR_COLOR,
          color: "#fff",
          p: 3,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          minHeight: "100vh",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
          Tài khoản cá nhân
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant={tabIndex === 0 ? "contained" : "text"}
            sx={{
              backgroundColor: tabIndex === 0 ? "#fff" : "transparent",
              color: tabIndex === 0 ? SIDEBAR_COLOR : "#fff",
              borderRadius: 2,
              fontWeight: 600,
              justifyContent: "flex-start",
              textTransform: "none",
              px: 3,
              boxShadow: tabIndex === 0 ? 2 : 0,
              border: tabIndex === 0 ? `2px solid ${SIDEBAR_COLOR}` : "none",
              transition: "all 0.2s",
            }}
            onClick={() => setTabIndex(0)}
            fullWidth
          >
            Thông tin cá nhân
          </Button>
          <Button
            variant={tabIndex === 2 ? "contained" : "text"}
            sx={{
              backgroundColor: tabIndex === 2 ? "#fff" : "transparent",
              color: tabIndex === 2 ? SIDEBAR_COLOR : "#fff",
              borderRadius: 2,
              fontWeight: 600,
              justifyContent: "flex-start",
              textTransform: "none",
              px: 3,
              boxShadow: tabIndex === 2 ? 2 : 0,
              border: tabIndex === 2 ? `2px solid ${SIDEBAR_COLOR}` : "none",
              transition: "all 0.2s",
            }}
            onClick={() => {
              setTabIndex(2);
              navigate(`/profile/edit/${user.id}`);
            }}
            fullWidth
          >
            Chỉnh sửa thông tin cá nhân
          </Button>
          <Button
            variant={tabIndex === 1 ? "contained" : "text"}
            sx={{
              backgroundColor: tabIndex === 1 ? "#fff" : "transparent",
              color: tabIndex === 1 ? SIDEBAR_COLOR : "#fff",
              borderRadius: 2,
              fontWeight: 600,
              justifyContent: "flex-start",
              textTransform: "none",
              px: 3,
              boxShadow: tabIndex === 1 ? 2 : 0,
              border: tabIndex === 1 ? `2px solid ${SIDEBAR_COLOR}` : "none",
              transition: "all 0.2s",
            }}
            onClick={() => {
              setTabIndex(1);
              if (shop) navigate('/quanlyshop');
              else navigate('/newShop');
            }}
            fullWidth
          >
            {shop ? "Quản lý Shop" : "Tạo Shop"}
          </Button>
          <Button
            variant={tabIndex === 3 ? "contained" : "text"}
            sx={{
              backgroundColor: tabIndex === 3 ? "#fff" : "transparent",
              color: tabIndex === 3 ? SIDEBAR_COLOR : "#fff",
              borderRadius: 2,
              fontWeight: 600,
              justifyContent: "flex-start",
              textTransform: "none",
              px: 3,
              boxShadow: tabIndex === 3 ? 2 : 0,
              border: tabIndex === 3 ? `2px solid ${SIDEBAR_COLOR}` : "none",
              transition: "all 0.2s",
            }}
            onClick={() => {
              setTabIndex(3);
              navigate(`/QuanLyMuaHang`);
            }}
            fullWidth
          >
            Quản lý đơn mua hàng
          </Button>
        </Box>
      </Box>
      {/* Main content */}
      <Box flex={1} p={3} display="flex" alignItems="center" justifyContent="center">
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 900,
            minWidth: 400,
            p: 5,
            borderRadius: 3,
            background: "#fff",
            mt: 2,
            boxSizing: "border-box",
            minHeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {tabIndex === 0 && (
                <Box display="flex" alignItems="center" gap={5} width="100%">
                  {/* Phần bên trái: Ảnh đại diện */}
                  <Box display="flex" flexDirection="column" alignItems="center" minWidth={160}>
                    <Avatar sx={{ width: 120, height: 120, bgcolor: "#e5e7eb" }}>
                      <AccountCircle sx={{ width: 110, height: 110, color: "#a3a3a3" }} />
                    </Avatar>
                  </Box>
                  {/* Phần bên phải: Thông tin cá nhân */}
                  <Box flex={1}>
                    <Typography variant="h4" gutterBottom sx={{ color: SIDEBAR_COLOR, textAlign: "left" }}>
                      Thông tin cá nhân
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Tên:</strong> {user.accountName}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Ngày sinh:</strong> {user.birthDate ? new Date(user.birthDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Địa chỉ:</strong> {user.address}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Số điện thoại:</strong> {user.phoneNumber}
                    </Typography>
                  </Box>
                </Box>
              )}
              {tabIndex === 1 && (
                <Box width="100%">
                  <Typography variant="h5" color="primary" textAlign="center">
                    {shop
                      ? 'Chuyển đến trang quản lý shop của bạn'
                      : 'Hãy tạo shop mới ngay bây giờ!'}
                  </Typography>
                </Box>
              )}
              {/* Tab 2 và 3 sẽ điều hướng sang trang khác nên không cần nội dung ở đây */}
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}