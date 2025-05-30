"use client"
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
  IconButton,
  Button
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { User } from "../data/User";
import { deleteUser, editRole, getListUsers } from "../services/UserService";

export default function QuanLyUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const nav = useNavigate();

  // Lọc danh sách User theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.accountName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Call API getListUsers
  useEffect(() => {
    getListUsers().then((data) => {
      const transformedUsers = data.map((item: any) => ({
        id: item.id,
        accountName: item.accountname,
        birthDate: new Date(item.birthdate),
        address: item.address,
        email: item.email,
        password: "",
        role: item.role.length === 0 ? "User" : item.role,
        phoneNumber: ""
      }));
      setUsers(transformedUsers);
    });
  }, []);

  // Xử lý checkbox
  const handleCheckboxChange = (id: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    const newSelected =
      selectedUsers.length === users.length ? [] : users.map((user) => user.id);
    setSelectedUsers(newSelected);
  };

  // Xóa các User được chọn
  const DeleteUsers = () => {
    selectedUsers.forEach((selectedUser) => {
      deleteUser(selectedUser).then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUser)
        );
        setSelectedUsers((prevSelected) =>
          prevSelected.filter((id) => id !== selectedUser)
        );
      });
    });
  };

  // Sửa vai trò của User
  const changeRole = (userId: string, role: string) => () => {
    editRole(userId, role).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: role } : user
        )
      );
    });
  };

  // Chuyển sang trang edit User
  const editUser = (id: string) => () => {
    nav(`/admin/QuanLyUser/edit/${id}`);
  };

  // Thêm User mới
  const newUser = () => {
    nav("/admin/QuanLyUser/new");
  };

  return (
    <Box className="flex w-screen">
      <AdminNav />
      <Box flex={1} p={3}>
        <Box 
          display="flex" 
          flexDirection="column" 
          gap={2}
          width="100%"
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1E3A8A" }}>
            Quản Lý User
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
                onClick={newUser}
                variant="outlined"
                sx={{
                  backgroundColor: "#FBFAF1",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  textTransform: "none"
                }}
              >
                Thêm User
              </Button>
              <Button
                onClick={DeleteUsers}
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  border: "1px solid red",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "darkred" }
                }}
              >
                Xóa User
              </Button>
            </Box>
          </Box>
          {/* Bảng danh sách User */}
          <TableContainer component={Paper} sx={{ width: "100%", mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Tên Tài khoản</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Ngày Sinh</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Địa Chỉ</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Vai Trò</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Chức Năng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.accountName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.birthDate
                        ? new Intl.DateTimeFormat("vi-VN", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit"
                          }).format(new Date(user.birthDate))
                        : "Chưa có dữ liệu"}
                    </TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user.id, e.target.value)()}
                        style={{
                          border: "1px solid #ccc",
                          padding: "5px",
                          borderRadius: "4px",
                          width: "100%"
                        }}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={editUser(user.id)}
                        variant="contained"
                        sx={{
                          backgroundColor: "#1E3A8A",
                          textTransform: "none",
                          "&:hover": { backgroundColor: "#155a9c" }
                        }}
                      >
                        Edit
                      </Button>
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