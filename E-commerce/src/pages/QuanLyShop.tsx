import { Search } from "@mui/icons-material";
import { InputBase, Button, Box, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { ShopDetails } from "../data/shopdetail";
import { deleteshop, fetchShops } from "../services/shopService";

export default function QuanLyShop() {
  const [shops, setshops] = useState<ShopDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedshops, setSelectedshops] = useState<string[]>([]);
  const nav = useNavigate();

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchShops().then((data) => {
      setshops(data);
    });
  }, []);

  const handleCheckboxChange = (id: string) => {
    if (!id) return;
    setSelectedshops((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id];
    });
  };

  const handleSelectAll = () => {
    const newSelected =
      selectedshops.length === shops.length
        ? []
        : shops.map((shop) => shop.id);
    setSelectedshops(newSelected);
  };

  const create = () => {
    nav("/admin/QuanLyShop/new");
  };

  const edit = (id: string) => () => {
    nav(`/admin/QuanLyShop/edit/${id}`);
  };

  const xemSP = (id: string) => () => {
    nav(`/admin/QuanLyShop/xemSP/${id}`);
  };

  const deleteShops = () => {
    selectedshops.forEach((selectedShop) => {
      deleteshop(selectedShop).then(() => {
        setshops((prevShops) =>
          prevShops.filter((shop) => shop.id !== selectedShop)
        );
        setSelectedshops((prevSelected) =>
          prevSelected.filter((id) => id !== selectedShop)
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
            Quản Lý Cửa Hàng
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
                onClick={create}
                variant="outlined"
                sx={{
                  backgroundColor: "#FBFAF1",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  textTransform: "none"
                }}
              >
                Thêm Shop
              </Button>
              <Button
                onClick={deleteShops}
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  border: "1px solid red",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "darkred" }
                }}
              >
                Xóa Shop
              </Button>
            </Box>
          </Box>
          {/* Bảng danh sách Shop */}
          <TableContainer component={Paper} sx={{ width: "100%", mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      checked={selectedshops.length === shops.length && shops.length > 0}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Tên Shop</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Hình đại diện</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Tên người dùng</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Điểm đánh giá</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Địa chỉ</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Chức năng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredShops.map((shop) => (
                  <TableRow key={shop.id} hover>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        checked={selectedshops.includes(shop.id)}
                        onChange={() => handleCheckboxChange(shop.id)}
                      />
                    </TableCell>
                    <TableCell>{shop.name}</TableCell>
                    <TableCell>
                      <img
                        src={shop.image}
                        alt={shop.name}
                        style={{ width: 60, height: 60, objectFit: "contain" }}
                      />
                    </TableCell>
                    <TableCell>{shop.userName}</TableCell>
                    <TableCell>{shop.rating}</TableCell>
                    <TableCell>{shop.address}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          onClick={edit(shop.id)}
                          variant="contained"
                          sx={{
                            backgroundColor: "#1E3A8A",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#155a9c" }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={xemSP(shop.id)}
                          variant="outlined"
                          sx={{
                            border: "1px solid #1E3A8A",
                            textTransform: "none",
                            color: "#1E3A8A",
                            "&:hover": { backgroundColor: "#F0ECE1" }
                          }}
                        >
                          Danh sách SP
                        </Button>
                      </Box>
                    </TableCell>
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