import { Search } from "@mui/icons-material";
import { InputBase, Box, Typography, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { Product } from "../data/productdetail";
import { getListCategories } from "../services/categoryService";
import {
    deleteProduct,
    getListProduct,
} from "../services/productDetailService";
import { Category, getCategoryNamebyId } from "./ChinhSuaSanPham";

export default function AdminQuanLySP() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCheckboxChange = (id: string) => {
    if (!id) return;
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];
    });
  };

  const handleSelectAll = () => {
    const newSelected =
      selectedProducts.length === products.length
        ? []
        : products.map((product) => product.id);
    setSelectedProducts(newSelected);
  };

  const { id: shopId } = useParams();
  useEffect(() => {
    getListProduct(shopId as string).then((data) => {
      setProducts(data);
    });
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const navigation = useNavigate();
  const back = () => {
    navigation("/admin/QuanLyShop");
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

  return (
    <Box className="flex w-screen">
      <AdminNav />
      <Box flex={1} p={3}>
        <Box display="flex" flexDirection="column" gap={2} width="100%">
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A" }}>
            Quản Lý Sản Phẩm
          </Typography>
          {/* Thanh tìm kiếm và nút */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <InputBase
              placeholder="Tìm kiếm..."
              onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={<Search sx={{ color: "#999", mr: 1 }} />}
              sx={{
                backgroundColor: "#F0ECE1",
                padding: "5px 10px",
                borderRadius: "20px",
                width: "100%"
              }}
            />
            <Box
              display="flex"
              gap={1}
              justifyContent="flex-end"
              mt={1}
              width="100%"
            >
              <Button
                onClick={back}
                variant="outlined"
                sx={{
                  backgroundColor: "#FBFAF1",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  textTransform: "none"
                }}
              >
                {"< Quay lại"}
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
          {/* Bảng danh sách sản phẩm */}
          <TableContainer component={Paper} sx={{ width: "100%", mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Tên sản phẩm</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Đơn giá</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Phân loại</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Số lượng</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Hình ảnh</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Mô tả</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                    </TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.unitPrice} VNĐ</TableCell>
                    <TableCell>{getCategoryNamebyId(product.categoryId, categories)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.productName}
                        style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }}
                      />
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}