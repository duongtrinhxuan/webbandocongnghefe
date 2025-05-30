import { Search } from "@mui/icons-material";
import { InputBase, Button, Box, Typography, Paper, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import {
  createCategoty,
  deleteCategory,
  getListCategories,
} from "../services/categoryService";
import { Category } from "./ChinhSuaSanPham";

export default function QuanLyCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id: string) => {
    if (!id) return;
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id];
    });
  };

  useEffect(() => {
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleSelectAll = () => {
    const newSelected =
      selectedCategories.length === categories.length
        ? []
        : categories.map((category) => category.id);

    setSelectedCategories(newSelected);
  };

  const create = () => {
    if (name === "") {
      alert("vui lòng nhập tên của Category!!!");
      return;
    }
    createCategoty(name).then((data) => {
      setCategories(data);
      setName("");
    });
  };

  const DeleteCategory = () => {
    selectedCategories.forEach((selectedCategorie) => {
      deleteCategory(selectedCategorie).then((data) => {
        setCategories(data);
        setSelectedCategories((prevSelected) =>
          prevSelected.filter((id) => id !== selectedCategorie)
        );
      });
    });
  };

  return (
    <Box className="flex w-screen">
      <AdminNav />
      <Box flex={1} p={3}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A" }}>
          Quản Lý Thể Loại
        </Typography>
        {/* Thanh nhập tên và nút hành động */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <InputBase
            placeholder="Tên Thể Loại"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              backgroundColor: "#F0ECE1",
              padding: "5px 10px",
              borderRadius: "20px",
              flex: 1,
            }}
          />
          <Box display="flex" gap={1} justifyContent="flex-end">
            <Button
              onClick={create}
              variant="outlined"
              sx={{
                backgroundColor: "#FBFAF1",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Thêm Thể Loại
            </Button>
            <Button
              onClick={DeleteCategory}
              variant="contained"
              sx={{
                backgroundColor: "red",
                border: "1px solid red",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              Xóa Thể Loại
            </Button>
          </Box>
        </Box>
        {/* Thanh tìm kiếm */}
        <Box mb={2}>
          <InputBase
            placeholder="Tìm kiếm..."
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={<Search sx={{ color: "#999", mr: 1 }} />}
            sx={{
              backgroundColor: "#F0ECE1",
              padding: "5px 10px",
              borderRadius: "20px",
              width: "100%",
            }}
          />
        </Box>
        {/* Bảng danh sách thể loại */}
        <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr style={{ backgroundColor: "#1E3A8A" }}>
                <th className="border border-gray-300 p-2 w-[15%] text-center" style={{ color: "#fff", fontWeight: "bold" }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === categories.length && categories.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border border-gray-300 p-2 text-left" style={{ color: "#fff", fontWeight: "bold" }}>
                  Tên
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {category.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Box>
    </Box>
  );
}