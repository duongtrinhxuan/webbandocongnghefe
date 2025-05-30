import React, { useEffect, useState } from 'react';
import { editUser } from '../../services/UserService';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { User } from '../../data/User'; // Thêm import User

interface ProfileEditDialogProps {
  open: boolean;
  onClose: () => void;
  userInfo: {
    id: string;
    AccountName: string;
    Password: string;
    Role: string;
    Email: string;
    BirthDate: Date | string;
    Address: string;
    PhoneNumber: string;
  };
  onSave: (updatedInfo: {
    id: string;
    AccountName: string;
    Password: string;
    Role: string;
    Email: string;
    BirthDate: Date | string;
    Address: string;
    PhoneNumber: string;
  }) => void;
}

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
  open,
  onClose,
  userInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState({ ...userInfo });

  useEffect(() => {
    setFormData({
      ...userInfo,
      BirthDate: userInfo.BirthDate
        ? typeof userInfo.BirthDate === "string"
          ? userInfo.BirthDate
          : new Date(userInfo.BirthDate).toISOString().split("T")[0]
        : "",
    });
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Chuyển đổi dữ liệu về đúng kiểu User
    const updatedData: User = {
      id: formData.id,
      accountName: formData.AccountName,
      password: formData.Password,
      role: formData.Role,
      email: formData.Email,
      birthDate: formData.BirthDate ? new Date(formData.BirthDate) : new Date(),
      address: formData.Address,
      phoneNumber: formData.PhoneNumber,
    };
    await editUser(updatedData);
    onSave({
      ...formData,
      BirthDate: updatedData.birthDate,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên"
          fullWidth
          margin="normal"
          name="AccountName"
          value={formData.AccountName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
        />
        <TextField
          label="Ngày sinh"
          fullWidth
          margin="normal"
          type="date"
          name="BirthDate"
          value={
            formData.BirthDate
              ? typeof formData.BirthDate === "string"
                ? formData.BirthDate
                : new Date(formData.BirthDate).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Địa chỉ"
          fullWidth
          margin="normal"
          name="Address"
          value={formData.Address}
          onChange={handleInputChange}
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          margin="normal"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditDialog;