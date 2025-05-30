import { Search } from "@mui/icons-material";
import { Box, Typography, Paper, InputBase, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/Another/ProductList";
import DashboardNav from "../components/DashboardNav";
import { Product } from "../data/productdetail";
import {
  deleteProduct,
  getListProduct,
} from "../services/productDetailService";
import { Category } from "./ChinhSuaSanPham";
import { getListCategories } from "../services/categoryService";
import { getShopId } from "../services/shopService";
import { useAuth } from '../components/Auth/AuthContext';

export default function QuanLySP() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectedProductsChange = (selected: string[]) => {
    setSelectedProducts(selected);
  };

  useEffect(() => {
    const shopIdPromise = user?.id ? getShopId(user.id) : null;
    shopIdPromise?.then((shopId: string) => {
      getListProduct(shopId).then((data) => {
        setProducts(data);
      });
    });
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const navigation = useNavigate();

  const newHandle = () => {
    navigation("/quanlyshop/new");
  };

  const editHandle = (id: string) => {
    navigation(`/quanlyshop/edit/${id}`);
  };

  const handleDelete = (selectedProducts: string[]) => () => {
    selectedProducts.forEach((selectedProduct) => {
      deleteProduct(selectedProduct).then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProduct)
        );
        setSelectedProducts((prevSelected) =>
          prevSelected.filter((id) => id !== selectedProduct)
        );
      });
    });
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="flex w-screen" sx={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <DashboardNav />
      <Box flex={1} p={3} minHeight="100vh">
        <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", fontWeight: 700, mb: 3 }}>
          Quản Lý Sản Phẩm
        </Typography>
        {/* Thanh tìm kiếm và nút */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={2}
        >
          <InputBase
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={<Search sx={{ color: "#999", mr: 1 }} />}
            sx={{
              backgroundColor: "#F0ECE1",
              padding: "5px 10px",
              borderRadius: "20px",
              width: "100%",
              maxWidth: 400,
            }}
          />
          <Box display="flex" gap={1} justifyContent="flex-end" mt={1} width="100%">
            <Button
              onClick={newHandle}
              variant="outlined"
              sx={{
                backgroundColor: "#FBFAF1",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textTransform: "none"
              }}
            >
              Thêm sản phẩm
            </Button>
            <Button
              onClick={handleDelete(selectedProducts)}
              variant="contained"
              sx={{
                backgroundColor: "red",
                border: "1px solid red",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { backgroundColor: "darkred" }
              }}
            >
              Xóa sản phẩm
            </Button>
          </Box>
        </Box>
        {/* Danh sách sản phẩm */}
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 2,
            borderRadius: 3,
            background: "#fff",
            boxSizing: "border-box",
            mt: 2,
            overflowX: "auto"
          }}
        >
          <ProductList
            products={filteredProducts}
            editProduct={editHandle}
            onSelectedProductsChange={handleSelectedProductsChange}
            categories={categories}
          />
        </Paper>
      </Box>
    </Box>
  );
}