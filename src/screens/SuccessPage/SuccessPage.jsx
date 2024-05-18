// src/screens/SuccessPage/SuccessPage.jsx
import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import logo from '../../assets/conejo2.png';  // Asegúrate de que la ruta al logo sea correcta
import matrizLogo from '../../assets/logo33.png';  // Logo de la casa matriz

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Icono para el mensaje de confirmación
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = location.state || { name: 'Cliente' };

  const whatsappMessage = "Hola, acabo de hacer un pedido en Madriguera y me gustaría obtener más información sobre mi orden. ¡Gracias!";
  const whatsappNumber = "+573016631906";

  const handleContactSupport = () => {
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleReturnToShop = () => {
    dispatch(clearCart());  // Vacía el carrito de compras
    navigate('/');  // Redirige a la página principal de la tienda
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', backgroundColor: '#f3f4f6' }}>
      <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
        <img src={logo} alt="Logo de la empresa" style={{ maxWidth: '220px', marginBottom: '10px' }} />
        <Typography variant="h4" gutterBottom style={{ color: '#4CAF50' }}>
          <CheckCircleOutlineIcon style={{ verticalAlign: 'middle', fontSize: '1.5em' }} /> Pedido Confirmado
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          ¡Gracias por tu pedido, {name}! Tu confirmación ha sido enviada por WhatsApp.
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#25D366', // Color característico de WhatsApp
            color: 'white',
            marginBottom: '20px',
            padding: '6px 12px', // Reduciendo el tamaño del padding para un botón más pequeño
            fontSize: '0.875rem' // Tamaño de fuente más pequeño para el texto
          }}
          startIcon={<WhatsAppIcon />}
          onClick={handleContactSupport}
        >
          <i className="fab fa-whatsapp" style={{ marginRight: 8 }}></i> Contactar Soporte
        </Button>
        <Link
          component="button"
          variant="body2"
          sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'black', mb: 2 }}
          onClick={handleReturnToShop}
        >
          Regresa al comercio
        </Link>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          Developed by
        </Typography>
        <img src={matrizLogo} alt="Logo de la casa matriz" style={{ width: 100, marginTop: '8px' }} />
      </Box>
    </Box>
  );
};

export default SuccessPage;
