import { useNavigate } from 'react-router-dom';
import { OrderUser } from '../../data/order';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

export interface Product {
    id: string;
    productName: string;
}
export interface OrderDetail {
    id: string;
    idReceipt : string;
    product : Product;
    quantity : number;
}
export interface Order {
  id: string;
  userId: string;
  total: number;
  datetime: Date;
}

interface OrderListProps {
  orders: OrderUser[];
}

export default function OrderList({ orders }: OrderListProps) {
  const navigate = useNavigate();

  const handleViewDetail = (orderId: string) => {
    navigate(`/chitiet/${orderId}`);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, mt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#1E3A8A", p: 2 }}>
        Danh sách Đơn hàng
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FBFAF1" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Mã đơn hàng</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Shop</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Ngày tạo</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Xem chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.shopName}</TableCell>
              <TableCell>{order.totalAmount?.toLocaleString('vi-VN')} VND</TableCell>
              <TableCell>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleViewDetail(order.id)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#1E3A8A",
                    color: "#fff",
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#155a9c" },
                  }}
                >
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ color: "#888" }}>
                Không có đơn hàng nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}