import { Search } from "@mui/icons-material";
import { InputBase, Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import OrderList from "../components/QuanLyMuaHang/OrderListbyUser";
import { getListOrderUser } from "../services/OrderService";
import { useAuth } from '../components/Auth/AuthContext';
import { OrderUser } from "../data/order";

export default function QuanLyMuaHang() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderUser[]>([]);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getListOrderUser(user?.id ?? "").then((data) => {
      setOrders(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      className="flex"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "#f9f9f9",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          width: "100vw",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 1200,
            p: 6,
            borderRadius: 4,
            background: "#fff",
            boxSizing: "border-box",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1E3A8A",
              mb: 4,
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Quản lý đơn mua hàng
          </Typography>
          <Box display="flex" justifyContent="center" mb={5}>
            <InputBase
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo mã đơn hàng"
              startAdornment={<Search style={{ color: "#999", marginRight: 12, fontSize: 32 }} />}
              sx={{
                backgroundColor: "#F0ECE1",
                px: 3,
                py: 2,
                borderRadius: "30px",
                width: { xs: "90vw", sm: 500, md: 600 },
                border: "1px solid #ccc",
                fontSize: "1.25rem",
                boxShadow: 1,
              }}
              inputProps={{
                style: { fontSize: "1.25rem", paddingLeft: 8 },
              }}
            />
          </Box>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <OrderList orders={filteredOrders} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}