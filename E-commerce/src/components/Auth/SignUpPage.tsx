"use client"
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { addRole } from '../../services/UserService';
import { createCart } from '../../services/cartService';

const customTheme = createTheme({
  palette: {
    primary: { main: '#1E3A8A' },
    secondary: { main: '#F59E42' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    text: { primary: '#333333' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
});

const SignUpPage: React.FC = () => {
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!accountName || !email || !password || !birthDate || !address || !phone) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7183/User/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, accountName, birthDate, address, phone }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.user, data.token);
        localStorage.setItem('token', data.token);
        const id = data.user.id;
        const role = "User";
        await addRole(id, role);
        data.user.role = role;
        await createCart(id);
        toast('Đăng ký thành công', { position: 'top-center' });
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Đăng ký thất bại!');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng ký!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 4,
            minWidth: 350,
            maxWidth: 450,
            width: '100%',
            background: '#fff',
          }}
        >
          <Typography variant="h4" align="center" fontWeight={700} mb={2} color="primary">
            Đăng ký
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Tên"
                placeholder="Nhập tên"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                placeholder="Nhập email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Sinh nhật"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                size="small"
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Link href="/login" underline="hover" sx={{ fontSize: 14 }}>
                Đã có tài khoản? Đăng nhập
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ borderRadius: 2, fontWeight: 600, fontSize: 16, py: 1.5, mt: 1 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpPage;