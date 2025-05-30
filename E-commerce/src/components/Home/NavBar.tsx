"use client"
import React, { useEffect } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Badge,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import {  ShoppingCart, Menu } from "@mui/icons-material";
import logo from "../../assets/logosecondhand.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useCartStore from "../../zustand/useCartStore";

const customTheme = createTheme({
  palette: {
    primary: { main: "#1E3A8A" },
    secondary: { main: "#F59E42" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#333333" }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: { fontWeight: 700, fontSize: "1.25rem" }
  }
});

const Navbar = () => {
  const isMobile = useMediaQuery(customTheme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const { cartDetail } = useCartStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Không tự động điều hướng nếu bạn muốn dùng navBar cho mọi trang
  }, [user, navigate]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuItems = (
    <List sx={{ display: isMobile ? "block" : "flex", gap: isMobile ? 0 : "20px" }}>
      {[
        { text: "Trang chủ", to: "/" },
        { text: "Sản phẩm", to: "/categories" },
        { text: "Shops", to: "/shops" },
        { text: "About", to: "/about" }
      ].map((item) => (
        <ListItemButton key={item.text} component={Link} to={item.to} sx={{ py: isMobile ? 1.5 : 0 }}>
          <ListItemText primary={item.text} primaryTypographyProps={{ noWrap: true, sx: { fontWeight: "bold" } }} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #1E3A8A 0%, #F59E42 100%)",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
          borderBottom: "3px solid #F59E42"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 }, py: 1.5 }}>
          {/* Left section - Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Brand Logo" style={{ height: "50px", borderRadius: "8px" }} />
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              SecondHand
            </Typography>
          </Box>

          {/* Middle Section - Menu */}
          {isMobile ? (
            <>
              <IconButton onClick={toggleDrawer(true)} sx={{ color: "#ffffff" }}>
                <Menu />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: { backgroundColor: "#ffffff" } }}
              >
                <Box
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                  sx={{ width: 250, mt: 2 }}
                >
                  <List>
                    {[
                      { text: "Trang chủ", to: "/" },
                      { text: "Sản phẩm", to: "/categories" },
                      { text: "Shops", to: "/shops" },
                      { text: "About", to: "/about" }
                    ].map((item) => (
                      <ListItemButton key={item.text} component={Link} to={item.to}>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box>{menuItems}</Box>
          )}

          {/* Right Section - Profile, Cart, Auth */}
          <Box display="flex" alignItems="center" gap="15px">
            {user ? (
              <>
                <IconButton onClick={handleProfileClick} sx={{ color: "#ffffff" }}>
                  <AccountCircleIcon />
                </IconButton>
                <IconButton onClick={handleCart} sx={{ color: "#ffffff" }}>
                  <Badge
                    badgeContent={cartDetail}
                    color="error"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <Button onClick={handleLogout} sx={{ color: "#ffffff", textTransform: "none", fontWeight: 600 }}>
                  Đăng Xuất
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")} sx={{ color: "#ffffff", textTransform: "none", fontWeight: 600 }}>
                  Đăng Nhập
                </Button>
                <Button onClick={() => navigate("/register")} sx={{ color: "#ffffff", textTransform: "none", fontWeight: 600 }}>
                  Đăng ký
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;