import React from 'react';
import { Container, Typography } from '@mui/material';

const Drivers = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sürücüler
      </Typography>
      {/* Sürücü listesi ve yönetim arayüzü buraya eklenecek */}
    </Container>
  );
};

export default Drivers; 