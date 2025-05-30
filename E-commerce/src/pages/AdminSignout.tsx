import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useAuth } from '../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminSignOut() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  const handleCancel = () => {
    setOpen(false);
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Xác nhận đăng xuất</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn đăng xuất không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Hủy
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Đăng xuất
        </Button>
      </DialogActions>
    </Dialog>
  );
}