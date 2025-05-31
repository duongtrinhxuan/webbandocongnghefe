import { useEffect, useState } from "react";
import { Cart } from "../data/Cart";
import {
  deleteCartItem,
  editQuantity,
  getCarts,
} from "../services/cartService";
import { useAuth } from "../components/Auth/AuthContext";
import CartItem from "../components/CartItem";
import { createReceipt } from "../services/OrderService";
import { useNavigate } from "react-router-dom";
import useCartStore from "../zustand/useCartStore";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Grid,
} from "@mui/material";

export default function CartPage() {
  const [carts, setCarts] = useState<Cart>({
    id: "",
    userId: "",
    shops: [],
  });
  const { user } = useAuth();
  const { setCartDetail } = useCartStore();
  const nav = useNavigate();
  const [total, setTotal] = useState(0);

  const updateTotal = () => {
    let tmp = 0;
    carts.shops.map((shop) => {
      shop.products.map((product) => {
        tmp = tmp + product.quantity * product.productInfo.unitPrice;
      });
    });
    setTotal(tmp);
  };

  useEffect(() => {
    const totalCartDetail = carts.shops.reduce(
      (sum, shop) => sum + shop.products.length,
      0
    );
    setCartDetail(totalCartDetail);
  }, [carts]);

  useEffect(() => {
    if (user) {
      getCarts(user?.id as string).then((data) => {
        setCarts(data[0]);
        updateTotal();
      });
    }
  }, [user]);

  useEffect(() => {
    if (carts) {
      updateTotal();
    }
  }, [carts]);

  const DeleteCartItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      const updatedCarts = await getCarts(user?.id as string);
      setCarts(updatedCarts[0]);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const updateQuantity = (
    idCart: string,
    shopId: string,
    productId: string,
    newQuantity: number
  ) => {
    setCarts((prevCart) => ({
      ...prevCart,
      shops: prevCart.shops.map((shop) =>
        shop.shopId === shopId
          ? {
              ...shop,
              products: shop.products.map((product) =>
                product.idProduct === productId
                  ? { ...product, quantity: newQuantity }
                  : product
              ),
            }
          : shop
      ),
    }));
    editQuantity(carts.id, idCart, productId, newQuantity);
  };

  const CreateReceipt = async () => {
    if (!carts || carts.shops.length === 0) {
      console.error("Giỏ hàng trống hoặc không hợp lệ");
      return;
    }
    const tmp = carts.shops.flatMap((shop) => shop.products);
    createReceipt(carts.userId, tmp).then((data) => {
      nav(`/receipt`, { state: { receiptData: data } });
    });
    tmp.map((item) => {
      deleteCartItem(item.id);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "#f9f9f9",
        py: 4,
        px: { xs: 1, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ color: "#1E3A8A", mb: 4, letterSpacing: 1 }}
        >
          Giỏ Hàng
        </Typography>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                p: { xs: 2, md: 4 },
                background: "#fff",
                boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
                mb: 2,
              }}
            >
              {carts?.shops?.length === 0 ? (
                <Typography color="text.secondary" align="center">
                  Giỏ hàng của bạn đang trống.
                </Typography>
              ) : (
                carts?.shops?.map((shop) => (
                  <Box key={shop.shopId} mb={4}>
                    <Box display="flex" alignItems="center" mb={2} gap={2}>
                      <img
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #F0ECE1",
                          background: "#fff",
                        }}
                        src={shop.shopInfo?.image}
                        alt={shop.shopInfo?.name}
                      />
                      <Typography fontWeight={700} fontSize={18} color="#1E3A8A">
                        {shop.shopInfo?.name}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {shop.products.map((product) => (
                      <Box key={product.id} mb={2}>
                        <CartItem
                          ProductCart={product}
                          onQuantityChange={(productId, newQuantity) =>
                            updateQuantity(
                              product.id,
                              shop.shopId,
                              productId,
                              newQuantity
                            )
                          }
                          DeleteCartItem={() => DeleteCartItem(product.id)}
                        />
                        <Divider sx={{ my: 2 }} />
                      </Box>
                    ))}
                  </Box>
                ))
              )}
            </Paper>
          </Grid>
          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                p: { xs: 2, md: 4 },
                background: "#fff",
                boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
                mb: 2,
                position: "sticky",
                top: 32,
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: "#1E3A8A", mb: 2 }}
              >
                Đơn Hàng
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Giá Gốc</Typography>
                  <Typography fontWeight={600}>{total} VNĐ</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Phí Ship</Typography>
                  <Typography fontWeight={600}>30,000 VNĐ</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight={700} color="#1E3A8A">
                    Thành Tiền
                  </Typography>
                  <Typography fontWeight={700} color="#1E3A8A">
                    {total + 30000} VNĐ
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 3,
                  bgcolor: "#F59E42",
                  color: "#fff",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1E3A8A",
                    color: "#fff",
                  },
                }}
                onClick={CreateReceipt}
              >
                Xác nhận
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}