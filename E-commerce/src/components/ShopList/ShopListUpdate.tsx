import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  Pagination,
  Paper,
} from "@mui/material";

import ShopCard from '../ShopCard/ShopCardUpdate';
import { Shop } from '../../data/shop';
import SearchFilter from '../ShopFilter/SearchFilter';

import useShopStore from '../../zustand/useShopStore';
import ShopGrid from '../ShowShop/ShopGrid';

const ShopList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { shops, filteredShops, setShops, resetFilters } = useShopStore();

  useEffect(() => {
    resetFilters();
    fetchShops();
    // eslint-disable-next-line
  }, [resetFilters, setShops]);

  const fetchShops = async () => {
    try {
      const response = await axios.get<Shop[]>('https://localhost:7183/Shop/getListUse');
      setShops(response.data);
      setLoading(false);
    } catch (error) {
      setError('Không thể lấy dữ liệu sản phẩm');
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredShops]);

  const displayedShops = filteredShops?.length ? filteredShops : [];

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;
  const totalPages = Math.ceil(displayedShops.length / itemsPerPage);
  const paginatedShops = displayedShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const categoryTitle = "SHOPS";

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
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1300,
          mx: "auto",
          p: { xs: 2, md: 5 },
          borderRadius: 4,
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                justifyContent: "flex-start",
                height: "100%",
                background: "linear-gradient(135deg, #1E3A8A 60%, #F59E42 100%)",
                borderRadius: 3,
                boxShadow: 2,
                p: 3,
                mb: { xs: 2, md: 0 },
                color: "#fff",
                minHeight: 220,
              }}
            >
              <Typography fontWeight={800} variant="h4" sx={{ color: "#fff" }}>
                {categoryTitle}
              </Typography>
              <Typography mt={1} variant="body1" sx={{ color: "#FDE68A", fontWeight: 600 }}>
                {displayedShops.length}{" "}
                {displayedShops.length > 1 ? "shops" : "shop"}
              </Typography>
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              <SearchFilter />
            </Box>
            <ShopGrid shops={paginatedShops} />
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
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 2,
                    fontWeight: 600,
                    color: "#1E3A8A",
                    borderColor: "#1E3A8A",
                  },
                  "& .Mui-selected": {
                    background: "#F59E42",
                    color: "#fff",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ShopList;