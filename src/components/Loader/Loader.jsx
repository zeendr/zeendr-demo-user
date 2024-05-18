import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import matrizLogo from '../../assets/logo33.png';  // Asegúrate de que la ruta al logo sea correcta

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', backgroundColor: '#fff' }}>
      <CircularProgress sx={{ mb: 3 }} />
      <Typography variant="h6" sx={{ color: '#333', fontFamily: 'Poppins' }}>
        By:
      </Typography>
      <img src={matrizLogo} alt="Logo de la casa matriz" style={{ width: 200, marginBottom: '16px' }} />
    </Box>
  );
};

export default Loader;
