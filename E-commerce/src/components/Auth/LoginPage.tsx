import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Link, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const customTheme = createTheme({
  palette: {
    primary: { main: '#1E3A8A' },
    secondary: { main: '#F59E42' },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: { primary: '#333333' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    let valid = true;
    setErrorEmail('');
    setErrorPassword('');
    if (!email) {
      setErrorEmail('Vui lòng nhập email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail('Email không hợp lệ');
      valid = false;
    }
    if (!password) {
      setErrorPassword('Vui lòng nhập mật khẩu');
      valid = false;
    }
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7183/User/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.user, data.token);
        localStorage.setItem('token', data.token);
        toast('Đăng nhập thành công!', { position: 'top-center' });
        if (data.user.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorPassword('Email hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      setErrorPassword('Đã xảy ra lỗi khi đăng nhập!');
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
            maxWidth: 400,
            width: '100%',
            background: '#fff',
          }}
        >
          <Typography variant="h4" align="center" fontWeight={700} mb={2} color="primary">
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleLogin}>
            <Box mb={2}>
              <Typography component="label" sx={{ fontWeight: 500, mb: 1, display: 'block' }}>
                Email
              </Typography>
              <TextField
                id="email"
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
                error={!!errorEmail}
                helperText={errorEmail}
              />
            </Box>
            <Box mb={2}>
              <Typography component="label" sx={{ fontWeight: 500, mb: 1, display: 'block' }}>
                Mật khẩu
              </Typography>
              <TextField
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                size="small"
                error={!!errorPassword}
                helperText={errorPassword}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
                Quên mật khẩu?
              </Link>
              <Link href="/register" underline="hover" sx={{ fontSize: 14 }}>
                Đăng ký
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;