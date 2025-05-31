import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Rating,
  createTheme,
  ThemeProvider,
  TextField,
  ButtonGroup,
  Paper,
} from "@mui/material";
import { Product } from "../../../data/products";
import { useAuth } from "../../Auth/AuthContext";
import { addCartItem, getCartId } from "../../../services/cartService";
import useCartStore from "../../../zustand/useCartStore";
interface Props {
  product: Product;
  productId: string;
}

const MainInfo = ({ product, productId }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [Option, setOption] = useState("DuyBeoU");
  const { user } = useAuth();
  let cartId = "";
  useEffect(() => {
    if (user)
      getCartId(user.id).then((data) => {
        cartId = data[0];
      });
  });
  const { incrementCartDetail } = useCartStore();

  const add = () => {
    addCartItem(cartId, productId, quantity);
    incrementCartDetail(1);
  };
  const handleQuantityChange = (change: number) => {
    if (change > 0 && quantity + change > parseInt(product.quantity)) {
      alert("Số lượng sản phẩm còn lại không đủ!!!!");
    } else {
      setQuantity((prev) => Math.max(1, prev + change));
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Nunito",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box width="100%">
        {/* Product Details */}
        <Paper
          sx={{
            bgcolor: "#1E3A8A",
            display: "inline-block",
            mb: 2,
            px: 2,
            py: 0.5,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(30,58,138,0.08)",
          }}
        >
          <Typography
            variant="subtitle1"
            color="#fff"
            fontWeight={700}
            sx={{ letterSpacing: 1 }}
          >
            {product.categoryName}
          </Typography>
        </Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontWeight: "800",
              fontSize: { xs: "2rem", md: "2.5rem" },
              mt: 1,
              color: "#1E3A8A",
              letterSpacing: 1,
            }}
          >
            {product.productName}
          </Typography>
          <Box display="flex" alignItems="center">
            <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  bgcolor: Number(product.quantity) > 0 ? "#4CAF50" : "#D32F2F",
                  mr: 1,
                }}
              />
            <Typography variant="body1" color="textSecondary">
              {product.quantity
                ? product.quantity + ` sản phẩm hiện có`
                : "Hết hàng"}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1} alignItems="center" mt={1}>
          <Rating
            value={product.rating}
            readOnly
            precision={0.5}
            size="medium"
          />
          <Typography fontWeight="bold" fontSize="18px" color="#1E3A8A">
            ({product.rating})
          </Typography>
          <Typography fontWeight="500" fontSize="16px" color="#C45C00">
            Đánh giá
          </Typography>
        </Box>
        <Typography
          variant="h4"
          fontWeight="800"
          my={3}
          sx={{ color: "#E600A0", letterSpacing: 1 }}
        >
          Giá tiền: {product.unitPrice} VND
        </Typography>

        {/* Description */}
        <Typography variant="h6" fontWeight="700" mb={1} color="#1E3A8A">
          MÔ TẢ
        </Typography>
        <Typography variant="body1" color="textPrimary" mb={2}>
          {product.description}
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="700" mr={1} color="#1E3A8A">
            Tình trạng:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {product.status}
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />

        <Box display="flex" alignItems="center" gap={4}>
          {/* Quantity Section */}
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1E3A8A">
              SỐ LƯỢNG
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                sx={{
                  borderColor: "#1E3A8A",
                  color: "#1E3A8A",
                  minWidth: 36,
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                -
              </Button>
              <TextField
                value={quantity}
                size="small"
                sx={{
                  width: 50,
                  mx: 1,
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 18,
                  },
                }}
                inputProps={{ style: { textAlign: "center" } }}
                disabled
              />
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(1)}
                sx={{
                  borderColor: "#1E3A8A",
                  color: "#1E3A8A",
                  minWidth: 36,
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} mt={4}>
          <Button
            onClick={add}
            variant="outlined"
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              flex: 1,
              borderColor: "#F59E42",
              color: "#F59E42",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#FFF7ED",
                borderColor: "#1E3A8A",
                color: "#1E3A8A",
              },
            }}
          >
            THÊM VÀO GIỎ HÀNG
          </Button>

          <Button
            variant="contained"
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              flex: 1,
              bgcolor: "#1E3A8A",
              color: "#FFFFFF",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#F59E42",
                color: "#1E3A8A",
              },
            }}
          >
            LIÊN HỆ NGƯỜI BÁN
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default MainInfo;