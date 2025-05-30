import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { User } from "../data/User";
import { addRole, createUser } from "../services/UserService";
import { createCart } from "../services/cartService";
import { Box, Typography, Paper, Button, InputBase } from "@mui/material";

export default function CreateUser() {
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    accountName: "",
    password: "",
    birthDate: new Date(),
    address: "",
    role: "",
    phoneNumber: ""
  });
  const nav = useNavigate();

  const create = () => {
    const isEmptyField = Object.entries(user).some(([key, value]) => {
      if (key === "birthDate" || key === "id" || key === "role") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    createUser(user).then(() => {
      var id = user.id;
      var role = "User";
      addRole(id, role);
      createCart(id);
      nav("/admin/QuanLyUser");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "birthDate" ? new Date(value) : value,
    }));
  };

  const cancel = () => {
    nav("/admin/QuanLyUser");
  };

  return (
    <Box className="flex w-screen">
      <AdminNav />
      <Box
        flex={1}
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ background: "#f9f9f9" }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            background: "#fff",
            mt: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A", textAlign: "center" }}>
            Thêm User
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Email
              </Typography>
              <InputBase
                type="text"
                value={user?.email}
                name="email"
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
                Tên người dùng
              </Typography>
              <InputBase
                type="text"
                value={user?.accountName}
                name="accountName"
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
                Mật khẩu
              </Typography>
              <InputBase
                type="text"
                value={user?.password}
                name="password"
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
                Ngày sinh
              </Typography>
              <InputBase
                type="date"
                value={user.birthDate.toISOString().split("T")[0]}
                name="birthDate"
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
                Địa chỉ
              </Typography>
              <InputBase
                type="text"
                value={user?.address}
                name="address"
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
                Số điện thoại
              </Typography>
              <InputBase
                type="text"
                value={user?.phoneNumber}
                name="phoneNumber"
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
                variant="contained"
                sx={{
                  backgroundColor: "#1E3A8A",
                  color: "#fff",
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 4,
                  "&:hover": { backgroundColor: "#155a9c" },
                }}
                onClick={create}
              >
                Thêm người dùng
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
                  "&:hover": { backgroundColor: "#F0ECE1" },
                }}
                onClick={cancel}
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