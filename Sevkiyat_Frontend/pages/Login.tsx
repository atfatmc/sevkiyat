import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı gereklidir';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(formData.username, formData.password);
        navigate('/dashboard');
      } catch (error) {
        // Error handling is done in AuthContext
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Giriş Yap
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Şifre"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/')}
              sx={{ mt: 1 }}
            >
              Ana Sayfaya Dön
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 