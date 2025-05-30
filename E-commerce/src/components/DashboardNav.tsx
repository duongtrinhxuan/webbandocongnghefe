
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logosecondhand.png"; // Đảm bảo đường dẫn đúng

const dashboardNavTheme = createTheme({
  palette: {
    primary: { main: "#16a34a" },
    secondary: { main: "#F59E42" },
    error: { main: "#ef4444" },
    background: { paper: "#ffffff" },
    text: { primary: "#ffffff" }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: { fontWeight: 700 }
  }
});

export default function DashboardNav() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={dashboardNavTheme}>
      <Box
        sx={{
          width: 260,
          height: "100vh",
          backgroundColor: dashboardNavTheme.palette.primary.main,
          color: dashboardNavTheme.palette.text.primary,
          p: 3,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Logo và tiêu đề */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <img src={logo} alt="Shop Logo" style={{ height: 44, width: 44, borderRadius: 8, marginRight: 8 }} />
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Quản lý Shop
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: "#fff", mb: 2 }} />
        {/* Các mục điều hướng */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/quanlyshop"
              sx={{
                borderRadius: 1,
                "&:hover": { backgroundColor: dashboardNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Quản lý sản phẩm"
                primaryTypographyProps={{ fontWeight: 600, color: "#fff" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/quanlyshop/QuanLyDonHang"
              sx={{
                borderRadius: 1,
                "&:hover": { backgroundColor: dashboardNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Quản lý đơn hàng"
                primaryTypographyProps={{ fontWeight: 600, color: "#fff" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/quanlyshop/QuanLyThongTin"
              sx={{
                borderRadius: 1,
                "&:hover": { backgroundColor: dashboardNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Thông tin cửa hàng"
                primaryTypographyProps={{ fontWeight: 600, color: "#fff" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 1,
                backgroundColor: "#ef4444",
                mt: 2,
                "&:hover": { backgroundColor: "#dc2626" }
              }}
              onClick={() => navigate("/profile")}
            >
              <ListItemText
                primary="Thoát"
                primaryTypographyProps={{ fontWeight: 700, color: "#fff", textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </ThemeProvider>
  );
}