import  { useState } from 'react';
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
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logosecondhand.png"; // Điều chỉnh đường dẫn logo nếu cần
import ConfirmDialog from '../components/Dialog/ConfirmDialog';
import { useAuth } from '../components/Auth/AuthContext';

const adminNavTheme = createTheme({
  palette: {
    primary: { main: '#1E3A8A' },
    secondary: { main: '#F59E42' },
    background: { paper: '#ffffff' },
    text: { primary: '#ffffff' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: { fontWeight: 700 }
  }
});

export default function AdminNav() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenDialog(false);
    logout();
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={adminNavTheme}>
      <Box
        sx={{
          width: 280,
          height: '100vh',
          backgroundColor: adminNavTheme.palette.primary.main,
          color: adminNavTheme.palette.text.primary,
          p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Phần Logo và Tiêu đề */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <img src={logo} alt="Admin Logo" style={{ height: 50, width: 50, borderRadius: '50%', marginRight: 8 }} />
          <Typography variant="h5" sx={{ color: '#ffffff' }}>
            Quản Trị Viên
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: '#ffffff', mb: 2 }} />
        {/* Các mục điều hướng */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin"
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: adminNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Quản lý Thể Loại"
                primaryTypographyProps={{ fontWeight: 600, color: '#ffffff' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/QuanLyUser"
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: adminNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Quản lý Người dùng"
                primaryTypographyProps={{ fontWeight: 600, color: '#ffffff' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/QuanLyShop"
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: adminNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Quản lý Cửa hàng"
                primaryTypographyProps={{ fontWeight: 600, color: '#ffffff' }}
              />
            </ListItemButton>
          </ListItem>
          {/* Tab Đăng Xuất */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogoutClick}
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: adminNavTheme.palette.secondary.main }
              }}
            >
              <ListItemText
                primary="Đăng Xuất"
                primaryTypographyProps={{ fontWeight: 600, color: '#ffffff' }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Confirm Dialog cho đăng xuất */}
        <ConfirmDialog
          open={openDialog}
          title="Xác nhận đăng xuất"
          message="Bạn có chắc chắn muốn đăng xuất không?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      </Box>
    </ThemeProvider>
  );
}