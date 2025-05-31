import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Paper
} from "@mui/material";
import styles from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../data/products';
import SearchFilter from '../Filter/SearchFilter';
import FilterProduct from '../Filter/FilterProduct';
// import { sampleProducts } from '../../data/products';
import useProductStore from '../../zustand/useProductStore';
import ProductGrid from '../ShowProduct/ProductGrid';

const ProductList: React.FC = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {products, filteredProducts, setProducts, resetFilters, filters} = useProductStore();
    useEffect(() => {
      resetFilters();
      fetchProducts();
    }, [resetFilters, setProducts]);
     // Hàm fetch data từ API
     const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://localhost:7183/Product/getListUse');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể lấy dữ liệu sản phẩm');
        setLoading(false);
      }
    };
    useEffect(() => {
      setCurrentPage(1);
    },[filteredProducts]);
    
    const displayedProducts = filteredProducts?.length
    ? filteredProducts.filter(product => Number(product.quantity) > 0)
    : [];

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;
    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
    const paginatedProducts = displayedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
      window.scrollTo(0, 0);
    };

    const categoryTitle =
    filteredProducts.length === 0
      ? "Sản Phẩm"
      : filters.category || "Sản Phẩm";

   return (
  <Box
    sx={{
      width: "100vw",
      minHeight: "100vh",
      background: "#f9f9f9",
      py: 4,
      px: { xs: 1, md: 4 },
      boxSizing: "border-box",
    }}
  >
    <Grid container spacing={4} sx={{ maxWidth: 1400, mx: "auto" }}>
      {/* Sidebar: Category & Filter */}
      <Grid item xs={12} md={3}>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: { xs: "center", md: "flex-start" },
      justifyContent: "flex-start",
      height: "100%",
      // Đổi màu nền cho phù hợp với navbar/footer
      background: "linear-gradient(135deg, #1E3A8A 60%, #F59E42 100%)",
      borderRadius: 3,
      boxShadow: 2,
      p: 3,
      mb: { xs: 2, md: 0 },
      color: "#fff",
      minHeight: 320,
    }}
  >
    <Typography fontWeight={800} variant="h4" sx={{ color: "#fff" }}>
      {categoryTitle}
    </Typography>
    <Typography mt={1} variant="body1" sx={{ color: "#FDE68A", fontWeight: 600 }}>
      {displayedProducts.length}{" "}
      {displayedProducts.length > 1 ? "products" : "product"}
    </Typography>
    <Box sx={{ width: "100%", mt: 3 }}>
      {/* Bọc FilterProduct bằng Paper để giữ nền trắng cho filter */}
      <Paper
        elevation={0}
        sx={{
          background: "#fff",
          borderRadius: 2,
          p: 2,
          width: "100%",
          color: "#1E3A8A",
        }}
      >
        <FilterProduct />
      </Paper>
    </Box>
  </Box>
</Grid>

      {/* Main Content: Search + Product Grid */}
      <Grid item xs={12} md={9}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 2, md: 4 },
            mb: 3,
            background: "#fff",
            boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <SearchFilter />
          </Box>
          <ProductGrid products={paginatedProducts} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

};


export default ProductList;