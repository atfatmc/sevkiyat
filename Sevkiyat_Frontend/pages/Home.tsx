import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Sevkiyat Yönetimi',
      description: 'Tüm sevkiyat süreçlerinizi tek bir platformdan yönetin.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Güvenli Sistem',
      description: 'En son güvenlik standartlarıyla verileriniz güvende.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Hızlı ve Verimli',
      description: 'Optimize edilmiş süreçlerle zamandan tasarruf edin.'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              color="white"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Sevkiyat Yönetim Sistemi
            </Typography>
            <Typography
              variant="h6"
              color="white"
              paragraph
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Modern ve kullanıcı dostu arayüz ile sevkiyat süreçlerinizi kolayca yönetin.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Giriş Yap
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          color: 'primary.main',
                          mb: 2
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 