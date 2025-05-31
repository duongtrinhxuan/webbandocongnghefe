import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import Rating from '@mui/material/Rating';
import DashboardNav from '../DashboardNav';
import { CommentDTO } from '../../data/comment';
import { addComment } from '../../services/reviewService';
import { OrderDetail } from '../../data/order';
import { getListOrderDetail } from '../../services/OrderService';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

export default function ChiTietDonHang() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [Comment, setComment] = useState<CommentDTO>({
    id: "",
    content: "",
    userId: "",
    productId: "",
    rating: 0,
    date: new Date(),
  });

  const openDialog = (productId: string, productName: string) => {
    setSelectedProduct({ id: productId, name: productName });
    setComment(prevComment => ({
      ...prevComment,
      productId: productId,
    }));
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setComment(prev => ({
      ...prev,
      content: "",
      rating: 0,
    }));
  };

  useEffect(() => {
    if (user) {
      setComment((prevComment) => ({
        ...prevComment,
        userId: user.id || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    getListOrderDetail(id ?? "").then((data) => {
      setOrderDetails(data);
    });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    const isEmptyField = Object.entries(Comment).some(([key, value]) => {
      if (key === "username" || key === "id" || key === "date") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    addComment(Comment).then(() => {
      closeDialog();
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(prevComment => ({
      ...prevComment,
      content: e.target.value
    }));
  };

  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setComment(prevComment => ({
      ...prevComment,
      rating: newValue ?? 0
    }));
  };

  return (
    <Box className="flex w-screen" sx={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" minHeight="100vh" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 900,
            p: 4,
            borderRadius: 3,
            background: "#fff",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1E3A8A", mb: 3, textAlign: "center" }}>
            Chi tiết Đơn hàng: {id}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#FBFAF1" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Mã sản phẩm</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tên sản phẩm</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Hình ảnh</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tương tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.map((detail) => (
                  <TableRow key={detail.id} hover>
                    <TableCell>{detail.idProduct}</TableCell>
                    <TableCell>{detail.productName}</TableCell>
                    <TableCell>
                      <img
                        src={detail.image}
                        alt={detail.productName}
                        style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                      />
                    </TableCell>
                    <TableCell>{detail.quantity}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => openDialog(detail.idProduct, detail.productName)}
                        variant="contained"
                        sx={{
                          backgroundColor: "#16a34a",
                          color: "#fff",
                          borderRadius: "8px",
                          textTransform: "none",
                          px: 2,
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#15803d" },
                        }}
                      >
                        Thêm Đánh Giá
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {orderDetails.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: "#888" }}>
                      Không có sản phẩm nào trong đơn hàng này.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog */}
          <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
              Thêm Review cho <span style={{ color: "#1E3A8A" }}>{selectedProduct?.name}</span>
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Nội dung"
                multiline
                minRows={3}
                value={Comment.content}
                onChange={handleContentChange}
                fullWidth
                sx={{ mb: 3 }}
              />
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography fontWeight={600}>Rating:</Typography>
                <Rating
                  name="simple-controlled"
                  value={Comment.rating}
                  onChange={handleRatingChange}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={closeDialog}
                variant="outlined"
                sx={{
                  color: "#1E3A8A",
                  border: "1px solid #1E3A8A",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#F0ECE1" },
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "#1E3A8A",
                  color: "#fff",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#155a9c" },
                }}
              >
                Gửi
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </Box>
  );
}