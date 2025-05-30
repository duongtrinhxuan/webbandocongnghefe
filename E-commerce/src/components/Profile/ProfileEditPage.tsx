import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../data/User";
import { editUser, getUser } from "../../services/UserService";
import { useAuth } from "../../components/Auth/AuthContext";
import { Box, Typography, Paper, Button, InputBase } from "@mui/material";
import Header from "../../components/Home/NavBar";
import Footer from "../../components/Home/Footer";

export default function EditProfilePage() {
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
  const { updateUser } = useAuth();
  const nav = useNavigate();
  const { id: userId } = useParams();

  useEffect(() => {
    getUser(userId as string).then((data) => {
      setUser({
        id: data[0].id,
        email: data[0].email,
        accountName: data[0].accountName,
        password: "",
        birthDate: new Date(data[0].birthDate),
        address: data[0].address,
        role: data[0].role,
        phoneNumber: data[0].phoneNumber
      });
    });
  }, []);

  const edit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const isEmptyField = Object.entries(user).some(([key, value]) => {
      if (key === "birthDate" || key === "id" || key === "password") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    editUser(user).then(() => {
      updateUser(user);
      nav("/profile/");
    });
  };

  const cancel = () => {
    nav("/profile");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "birthDate" ? new Date(value) : value,
    }));
  };

  return (
    <>
      <Header />
      <Box
        minHeight="100vh"
        sx={{
          background: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
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
            Chỉnh Sửa Thông Tin Cá Nhân
          </Typography>
          <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={edit}>
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
                onClick={edit}
              >
                Chỉnh sửa
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
                onClick={cancel}
              >
                Hủy bỏ
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}