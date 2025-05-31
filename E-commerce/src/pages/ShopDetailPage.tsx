import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShopDetails } from '../services/shopService';
import { Shop } from '../data/shop';
import { fetchProductsByShopId } from '../services/productService';
import { Product } from '../data/products';
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Divider,
  createTheme,
  ThemeProvider,
  Paper,
  Grid,
} from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import MainShop from "../components/ShopDetail/MainShop/MainShop";

const DividerSection = () => (
  <Divider
    sx={{ width: "90%", margin: "0 auto", borderBottomWidth: 2, my: 6 }}
  />
);

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
});

const ShopDetailPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shopDetails, setShopDetails] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShopDetails = async () => {
      try {
        const shopData = await fetchShopDetails(shopId!);
        const productData = await fetchProductsByShopId(shopId!);

        setShopDetails(shopData);
        setProducts(productData);
      } catch (error) {
        console.error("Không tải được dữ liệu chi tiết shop:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShopDetails();
  }, [shopId]);

  if (loading) {
    return (
      <Box
        minHeight="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  const filteredProducts = products.filter((product) => Number(product.quantity) > 0);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "#f9f9f9",
          py: { xs: 2, md: 6 },
          px: { xs: 0, md: 4 },
          boxSizing: "border-box",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1, md: 3 } }}>
          {shopDetails && (
            <Paper
              elevation={4}
              sx={{
                borderRadius: 4,
                p: { xs: 2, md: 4 },
                background: "#fff",
                mb: 5,
                boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
              }}
            >
              <MainShop shop={shopDetails} />
            </Paper>
          )}

          <DividerSection />

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#1E3A8A",
              mb: 3,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Danh sách sản phẩm của cửa hàng {shopDetails?.name}
          </Typography>

          {filteredProducts.length > 0 ? (
            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 4 }}
            >
              Không có sản phẩm nào.
            </Typography>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ShopDetailPage;