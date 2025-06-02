import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Paper,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalShipping as ShippingIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Kullanıcılar', icon: <PeopleIcon />, path: '/users' },
    { text: 'Sevkiyatlar', icon: <ShippingIcon />, path: '/shipping' },
    { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.company}
          </Typography>
        </Box>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Çıkış Yap" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sevkiyat Yönetim Sistemi
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '64px',
          bgcolor: 'grey.100'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Hoş Geldiniz, {user?.username}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sevkiyat yönetim sistemine hoş geldiniz. Sol menüden işlemlerinizi gerçekleştirebilirsiniz.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Kullanıcı Bilgileri
                </Typography>
                <Typography variant="body1">
                  Kullanıcı Adı: {user?.username}
                </Typography>
                <Typography variant="body1">
                  Firma: {user?.company}
                </Typography>
                <Typography variant="body1">
                  Komisyon Oranı: %{user?.commissionRate}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Hızlı İşlemler
                </Typography>
                <Grid container spacing={2}>
                  {menuItems.map((item) => (
                    <Grid item xs={6} key={item.text}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'white'
                          }
                        }}
                        onClick={() => navigate(item.path)}
                      >
                        {item.icon}
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {item.text}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 