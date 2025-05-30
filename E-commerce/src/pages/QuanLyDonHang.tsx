import { Search } from "@mui/icons-material";
import { Box, Typography, Paper, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { getListOrder } from "../services/OrderService";
import { useAuth } from "../components/Auth/AuthContext";
import { getShopId } from "../services/shopService";
import { RawOrderItem, Order } from "../data/order";

export default function QuanLyDonHang() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rawOrders, setRawOrders] = useState<RawOrderItem[]>([]);
  const { user } = useAuth();

  // Call API
  useEffect(() => {
    const shopIdPromise = user?.id ? getShopId(user.id) : null;
    shopIdPromise?.then((shopId: string) => {
      getListOrder(shopId).then((data) => {
        setRawOrders(data);
      });
    });
  }, []);

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  // Chuyển đổi dữ liệu
  const transformedOrders: Order[] = Object.values(
    rawOrders.reduce((acc, item) => {
      const { idReceipt, receipt, idProduct, quantity, product } = item;

      if (!acc[idReceipt]) {
        acc[idReceipt] = {
          idReceipt,
          accountName: receipt.accountName || "Khách hàng không xác định",
          total: 0,
          date: formatDate(receipt.date),
          ListSP: [],
        };
      }

      acc[idReceipt].total += product.totalPrice;

      acc[idReceipt].ListSP.push({
        idProduct,
        productName: product.productName,
        unitPrice: product.unitPrice,
        totalPrice: product.totalPrice,
        quantity,
      });

      return acc;
    }, {} as Record<string, Order>)
  );

  // Lọc đơn hàng
  const filteredOrders = transformedOrders.filter((order) =>
    order.idReceipt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="flex w-screen" sx={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <DashboardNav />
      <Box flex={1} p={3} display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
        <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", fontWeight: 700, mb: 3 }}>
          Quản Lý Đơn Hàng
        </Typography>
        {/* Thanh tìm kiếm */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
          maxWidth={700}
          mb={3}
        >
          <InputBase
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm mã đơn hàng..."
            startAdornment={<Search sx={{ color: "#999", mr: 1 }} />}
            sx={{
              backgroundColor: "#F0ECE1",
              padding: "5px 10px",
              borderRadius: "20px",
              width: "100%",
              maxWidth: 400,
            }}
          />
        </Box>
        {/* Bảng danh sách đơn hàng */}
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 1000,
            p: 2,
            borderRadius: 3,
            background: "#fff",
            boxSizing: "border-box",
            mt: 2,
            overflowX: "auto"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Danh sách Đơn hàng
          </Typography>
          <table className="min-w-full border-gray-300 bg-white">
            <thead>
              <tr style={{ backgroundColor: "#FBFAF1" }} className="text-left">
                <th className="border border-gray-300 py-2 px-4 border-b">Mã đơn hàng</th>
                <th className="border border-gray-300 py-2 px-4 border-b">Ngày tạo</th>
                <th className="border border-gray-300 py-2 px-4 border-b">Tên người mua</th>
                <th className="border border-gray-300 py-2 px-4 border-b">Tổng tiền</th>
                <th className="border border-gray-300 py-2 px-2 border-b">Danh sách sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.idReceipt}>
                  <td className="border border-gray-300 py-2 px-4 border-b">{order.idReceipt}</td>
                  <td className="border border-gray-300 py-2 px-4 border-b">{order.date}</td>
                  <td className="border border-gray-300 py-2 px-4 border-b">{order.accountName}</td>
                  <td className="border border-gray-300 py-2 px-4 border-b">
                    {order.total.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="border border-gray-300 py-2 px-2 border-b">
                    <ul className="list-disc pl-5">
                      {order.ListSP.map((product) => (
                        <li key={product.idProduct}>
                          {product.productName} - x{product.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Paper>
      </Box>
    </Box>
  );
}