import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { Product } from "../data/productdetail";
import { editProduct, getProduct } from "../services/productDetailService";
import { getListCategories } from "../services/categoryService";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../FireBaseConfig";
import {getShopId} from "../services/shopService"
import { useAuth } from '../components/Auth/AuthContext';
import { Box, Typography, Button, InputBase, } from "@mui/material";
export const uploadToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images2/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export interface Category {
  id: string;
  name: string;
}

export const getCategoryNamebyId = (
  id: string,
  categories: Category[]
): string | null => {
  const category = categories.find((cat) => cat.id === id);
  return category ? category.name : null;
};
export default function ChinhSuaSP() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
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
  const navigation = useNavigate();
  //call api getProduct và getListCategories
  useEffect(() => {
    if (id) {
      getProduct(id).then((data) => {
        setProductData(data);
      });
    }
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const cancelHandle = () => {
    navigation("/quanlyshop");
  };
  //call api editProduct
  var idshop:any
  const updateHandle = async () => {
    if (user?.id) {
      idshop = await getShopId(user.id); // Chờ Promise resolve và gán kết quả
    }
    // Không thay đổi dữ liệu trong form ngay lập tức
    const productWithNumbers = {
      ...productData,
      unitPrice: parseFloat(productData.unitPrice.toString()),
      quantity: parseInt(productData.quantity.toString(), 10),
      id: id as string,
      idShop: idshop,
    };
    const isEmptyField = Object.entries(productWithNumbers).some(
      ([key, value]) => {
        return value === "";
      }
    );

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    // Thực hiện cập nhật dữ liệu
    await editProduct(productWithNumbers);
    navigation("/quanlyshop");
  };

  const tinhtrangs = [
    "mới (100%)",
    "đã sử dụng (99%)",
    "đã sử dụng (90%)",
    "đã sử dụng(80%)",
  ];

  // Xử lý thay đổi dữ liệu trong form
  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "unitPrice" || name === "quantity") {
      const numericValue = parseFloat(value);
      if (numericValue < 1) {
        alert("Giá trị không được nhỏ hơn 1");
        return;
      }
    }
    await setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(productData);
  };

  // Xử lý thay đổi file ảnh
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadToFirebase(file);
      setProductData((prev) => ({ ...prev, image: url })); // Cập nhật URL ảnh vào productData
    }
  };

 // ...existing code...
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
      <Box
        component="form"
        className="w-full"
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          background: "#fff",
          boxSizing: "border-box",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", textAlign: "center", fontWeight: 700 }}>
          Chỉnh sửa sản phẩm
        </Typography>
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
          <select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleChange}
            style={{
              backgroundColor: "#F0ECE1",
              borderRadius: "8px",
              padding: "8px 16px",
              width: "100%",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="" disabled>
              ---Chọn phân loại---
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Box>
        <Box>
          <Typography fontWeight={600} mb={1}>
            Tình trạng
          </Typography>
          <select
            name="status"
            value={productData.status}
            onChange={handleChange}
            style={{
              backgroundColor: "#F0ECE1",
              borderRadius: "8px",
              padding: "8px 16px",
              width: "100%",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="" disabled>
              ---Chọn tình trạng---
            </option>
            {tinhtrangs.map((tinhtrang, index) => (
              <option key={index} value={tinhtrang}>
                {tinhtrang}
              </option>
            ))}
          </select>
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
            type="button"
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
            onClick={updateHandle}
          >
            Cập nhật
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
    </Box>
  </Box>
);
// ...existing code...
}
