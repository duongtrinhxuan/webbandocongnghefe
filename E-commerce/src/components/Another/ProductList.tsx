import { useEffect, useState } from 'react';
import { Category, getCategoryNamebyId } from '../../pages/ChinhSuaSanPham';
import { Product } from '../../data/productdetail';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";

// Định nghĩa props cho ProductList
interface ProductListProps {
  products: Product[];
  editProduct: (productId: string) => void;
  onSelectedProductsChange: (selected: string[]) => void;
  categories: Category[];
}

export default function ProductList({
  products,
  editProduct,
  onSelectedProductsChange,
  categories,
}: ProductListProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    onSelectedProductsChange(selectedProducts);
  }, [selectedProducts, onSelectedProductsChange]);

  const handleCheckboxChange = (id: string) => {
    if (!id) return;
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    const newSelected =
      selectedProducts.length === products.length && products.length > 0
        ? []
        : products.map((product) => product.id);
    setSelectedProducts(newSelected);
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%", mt: 2, borderRadius: 3, boxSizing: "border-box" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#1E3A8A", p: 2 }}>
        Danh sách sản phẩm
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>
              <Checkbox
                checked={selectedProducts.length === products.length && products.length > 0}
                onChange={handleSelectAll}
                sx={{ color: "#fff", '&.Mui-checked': { color: "#F59E42" } }}
              />
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tên sản phẩm</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Đơn giá</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Phân loại</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Số lượng</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Hình ảnh</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mô tả</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell align="center">
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                  sx={{ color: "#1E3A8A", '&.Mui-checked': { color: "#F59E42" } }}
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
              <TableCell>
                <Button
                  onClick={() => editProduct(product.id)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#1E3A8A",
                    color: "#fff",
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#155a9c" },
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ color: "#888" }}>
                Không có sản phẩm nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}