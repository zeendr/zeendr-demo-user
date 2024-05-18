// src/components/Footer/Footer.jsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import madrigueraLogo from '../../assets/conejo2.png';  // Asegúrate de que la ruta al logo sea correcta
import instagramIcon from '../../assets/insta.png';
import whatsappIcon from '../../assets/wpp.png';
import tiktokIcon from '../../assets/tiktok.png';

import './Footer.css'

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/about');
  };

  return (
    <Box sx={{ mt: 6, backgroundColor: '#fff', textAlign: 'center', borderTop: '1px solid #ddd' }} elevation={0}>
      <Typography variant="h6" sx={{ mb: 1, fontSize: '1.2rem', color: '#333' }}>
        Síguenos
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <IconButton href="https://www.instagram.com/" target="_blank" sx={{ p: 0 }}>
          <img src={instagramIcon} alt="Instagram" style={{ width: 25, height: 25 }} />
        </IconButton>
        <IconButton href="https://www.tiktok.com/" target="_blank" sx={{ p: 0 }}>
          <img src={tiktokIcon} alt="TikTok" style={{ width: 25, height: 25 }} />
        </IconButton>
        <IconButton href="https://wa.me/+573016631906" target="_blank" sx={{ p: 0 }}>
          <img src={whatsappIcon} alt="WhatsApp" style={{ width: 25, height: 25 }} />
        </IconButton>
      </Box>
      <Box sx={{ mb: 1, cursor: 'pointer', animation: 'bounce 2s infinite' }} onClick={handleLogoClick}>
        <img
          src={madrigueraLogo}
          alt="Logo de Madriguera"
          style={{ width: 100, marginBottom: '10px', transition: 'transform 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
      </Box>
    </Box>
  );
};

export default Footer;
