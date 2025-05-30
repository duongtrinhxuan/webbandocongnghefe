import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { Product } from "../data/productdetail";
import { addProduct } from "../services/productDetailService";
import { uploadToFirebase } from "./ChinhSuaSanPham";
import { getListCategories } from "../services/categoryService";
import { getShopId } from "../services/shopService";
import { useAuth } from '../components/Auth/AuthContext';
import { Box, Typography, Paper, Button, InputBase, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function ProductCreate() {
  const tinhtrangs = [
    "mới (100%)",
    "đã sử dụng (99%)",
    "đã sử dụng (90%)",
    "đã sử dụng(80%)",
  ];
  const { user } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [productData, setProductData] = useState<Product>({
    id: "",
    productName: "",
    image: "",
    unitPrice: 0,
    quantity: 0,
    description: "",
    categoryId: "",
    status: "",
    idShop: "",
    categoryName: "",
  });

  useEffect(() => {
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const navigation = useNavigate();
  const cancelHandle = () => {
    navigation("/quanlyshop");
  };

  //call api createProduct
  const addHandle = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let idshop = "";
    if (user?.id) {
      idshop = await getShopId(user.id);
    }
    const productWithNumbers = {
      ...productData,
      idShop: idshop,
      unitPrice: parseFloat(productData.unitPrice.toString()),
      quantity: parseInt(productData.quantity.toString(), 10),
    };
    const isEmptyField = Object.entries(productWithNumbers).some(
      ([key, value]) => {
        if (key === "id" || key === "categoryName") return false;
        return value === "" || value === 0;
      }
    );

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    await addProduct(productWithNumbers);
    navigation("/quanlyshop");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if (name === "unitPrice" || name === "quantity") {
      const numericValue = parseFloat(value);
      if (numericValue < 1) {
        alert("Giá trị không được nhỏ hơn 1");
        return;
      }
    }
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi file ảnh
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadToFirebase(file);
      setProductData((prev) => ({ ...prev, image: url }));
    }
  };

  return (
    <Box className="flex w-screen" sx={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <DashboardNav />
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ py: 6 }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            background: "#fff",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", textAlign: "center", fontWeight: 700 }}>
            Thêm sản phẩm
          </Typography>
          <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={addHandle}>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Ảnh minh họa
              </Typography>
              <InputBase
                type="file"
                onChange={handleFileChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
                inputProps={{ accept: "image/*" }}
              />
              {productData.image && (
                <Box mt={1}>
                  <img
                    src={productData.image}
                    alt="Ảnh sản phẩm"
                    style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Tên sản phẩm
              </Typography>
              <InputBase
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Đơn giá
              </Typography>
              <InputBase
                type="number"
                name="unitPrice"
                value={productData.unitPrice}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Phân loại
              </Typography>
              <Select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleChange}
                displayEmpty
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
                inputProps={{ "aria-label": "Chọn phân loại" }}
              >
                <MenuItem value="" disabled>
                  ---Chọn phân loại---
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Tình trạng
              </Typography>
              <Select
                name="status"
                value={productData.status}
                onChange={handleChange}
                displayEmpty
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
                inputProps={{ "aria-label": "Chọn tình trạng" }}
              >
                <MenuItem value="" disabled>
                  ---Chọn tình trạng---
                </MenuItem>
                {tinhtrangs.map((tinhtrang, index) => (
                  <MenuItem key={index} value={tinhtrang}>
                    {tinhtrang}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Số lượng
              </Typography>
              <InputBase
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Mô tả
              </Typography>
              <InputBase
                multiline
                minRows={3}
                name="description"
                value={productData.description}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#F0ECE1",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#1E3A8A",
                  color: "#fff",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#155a9c" },
                }}
              >
                Thêm sản phẩm
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  color: "#1E3A8A",
                  border: "1px solid #1E3A8A",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#F0ECE1" },
                }}
                onClick={cancelHandle}
              >
                Hủy bỏ
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}