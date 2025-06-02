import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  LocalShipping as ShipmentIcon,
  People as CustomerIcon,
  DirectionsCar as VehicleIcon,
  Person as DriverIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle,
} from '@mui/icons-material';
import Swal from 'sweetalert2';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Sevkiyatlar', icon: <ShipmentIcon />, path: '/shipments' },
  { text: 'Müşteriler', icon: <CustomerIcon />, path: '/customers' },
  { text: 'Araçlar', icon: <VehicleIcon />, path: '/vehicles' },
  { text: 'Sürücüler', icon: <DriverIcon />, path: '/drivers' },
];

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2a5298;
  color: white;
  height: 100vh;
  position: fixed;
  padding: 2rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const MenuItemStyled = styled.div<{ active?: boolean }>`
  padding: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: 5px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.div`
  margin-left: 250px;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #2a5298;
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c82333;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #2a5298;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Çıkış yapmak istediğinize emin misiniz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('isAuthenticated');
      await Swal.fire({
        icon: 'success',
        title: 'Başarıyla çıkış yapıldı',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/login');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Sevkiyat
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>Sevkiyat Pro</Logo>
        <MenuItemStyled 
          active={activeMenu === 'dashboard'} 
          onClick={() => setActiveMenu('dashboard')}
        >
          Dashboard
        </MenuItemStyled>
        <MenuItemStyled 
          active={activeMenu === 'shipments'} 
          onClick={() => setActiveMenu('shipments')}
        >
          Sevkiyatlar
        </MenuItemStyled>
        <MenuItemStyled 
          active={activeMenu === 'assembly'} 
          onClick={() => setActiveMenu('assembly')}
        >
          Montaj İşleri
        </MenuItemStyled>
        <MenuItemStyled 
          active={activeMenu === 'customers'} 
          onClick={() => setActiveMenu('customers')}
        >
          Müşteriler
        </MenuItemStyled>
        <MenuItemStyled 
          active={activeMenu === 'reports'} 
          onClick={() => setActiveMenu('reports')}
        >
          Raporlar
        </MenuItemStyled>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>Dashboard</Title>
          <LogoutButton onClick={handleLogout}>Çıkış Yap</LogoutButton>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatTitle>Aktif Sevkiyatlar</StatTitle>
            <StatValue>12</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Bekleyen Montajlar</StatTitle>
            <StatValue>5</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Toplam Müşteri</StatTitle>
            <StatValue>48</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Aylık Gelir</StatTitle>
            <StatValue>₺125,000</StatValue>
          </StatCard>
        </StatsGrid>

        {/* Add more dashboard content here */}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard; 