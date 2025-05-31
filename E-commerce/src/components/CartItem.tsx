import { ProductCart } from "../data/Cart";
import { useState } from "react";
import { Box, Typography, IconButton, Button, Paper, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CartItemProps {
  ProductCart: ProductCart;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  DeleteCartItem: (id: string) => void;
}

export default function CartItem({ ProductCart, onQuantityChange, DeleteCartItem }: CartItemProps) {
  const [quantity, setQuantity] = useState(ProductCart.quantity);

  const handleIncrease = () => {
    let newQuantity = 0;
    if (quantity < ProductCart.productInfo.quantity) {
      newQuantity = quantity + 1;
    } else {
      newQuantity = ProductCart.productInfo.quantity;
      alert("Số lượng sản phẩm còn lại không đủ!");
    }
    setQuantity(newQuantity);
    onQuantityChange(ProductCart.idProduct, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onQuantityChange(ProductCart.idProduct, newQuantity);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        background: "#FBFAF1",
        boxShadow: "0 2px 8px rgba(30,58,138,0.04)",
        mb: 1,
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        {/* Image */}
        <Box
          component="img"
          src={ProductCart.productInfo.image}
          alt={ProductCart.productInfo.productName}
          sx={{
            width: 70,
            height: 70,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid #F0ECE1",
            background: "#fff",
            mr: 2,
          }}
        />

        {/* Item Details */}
        <Box flex={1} minWidth={120}>
          <Typography fontWeight={700} fontSize={17} color="#1E3A8A" noWrap>
            {ProductCart.productInfo.productName}
          </Typography>
          <Button
            size="small"
            startIcon={<DeleteOutlineIcon />}
            sx={{
              mt: 1,
              color: "#D32F2F",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { textDecoration: "underline", bgcolor: "#FFF0F0" },
            }}
            onClick={() => DeleteCartItem(ProductCart.id)}
          >
            Xóa
          </Button>
        </Box>

        {/* Quantity Controller and Price */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Quantity Controller */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              size="small"
              onClick={handleDecrease}
              sx={{
                border: "1px solid #F0ECE1",
                bgcolor: "#fff",
                color: "#1E3A8A",
                "&:hover": { bgcolor: "#F0ECE1" },
              }}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              size="small"
              inputProps={{
                style: {
                  width: 32,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: 0,
                },
                readOnly: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  bgcolor: "#fff",
                  borderRadius: 1,
                  px: 0,
                },
                width: 40,
              }}
            />
            <IconButton
              size="small"
              onClick={handleIncrease}
              sx={{
                border: "1px solid #F0ECE1",
                bgcolor: "#fff",
                color: "#1E3A8A",
                "&:hover": { bgcolor: "#F0ECE1" },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* Price */}
          <Typography
            fontWeight={700}
            fontSize={17}
            color="#E600A0"
            sx={{ minWidth: 110, textAlign: "right" }}
          >
            {ProductCart.productInfo.unitPrice * quantity} VNĐ
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}