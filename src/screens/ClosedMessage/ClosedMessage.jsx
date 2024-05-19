// src/components/ClosedMessage/ClosedMessage.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import logo from '../../assets/logo2.png'; // Asegúrate de tener el logo de Madriguera en esta ruta

const ClosedMessageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f4f1ea', // Fondo más claro
  textAlign: 'center',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledTypography = styled(Typography)({
  color: '#444', // Texto más oscuro para buen contraste
  marginBottom: '16px',
  fontFamily: 'Poppins, Arial, sans-serif',
});

const LogoImage = styled('img')({
  width: '180px', // Aumentar el tamaño del logo
  marginBottom: '30px', // Aumentar el espacio inferior
});

const ClosedMessage = ({ horarios }) => {
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const isPM = hourInt >= 12;
    const formattedHour = hourInt % 12 || 12;
    const formattedTime = `${formattedHour}:${minute} ${isPM ? 'PM' : 'AM'}`;
    return formattedTime;
  };

  return (
    <ClosedMessageContainer>
      <LogoImage src={logo} alt="Madriguera Logo" />
      <StyledTypography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Estamos cerrados
      </StyledTypography>
      <StyledTypography variant="body1" sx={{ marginBottom: '24px' }}>
        Lo sentimos, pero actualmente no estamos tomando pedidos. Por favor, vuelve más tarde.
      </StyledTypography>
      <StyledTypography variant="body1" sx={{ marginBottom: '8px' }}>
        Gracias por visitar nuestra tienda.
      </StyledTypography>
      <StyledTypography variant="body1" sx={{ marginBottom: '24px' }}>
        Nuestros horarios de atención para domicilios son:
      </StyledTypography>
      <Box>
        {horarios.map((horario) => (
          <StyledTypography key={horario.dia} variant="body2">
            {`${horario.dia}: ${formatTime(horario.apertura)} - ${formatTime(horario.cierre)}`}
          </StyledTypography>
        ))}
      </Box>
    </ClosedMessageContainer>
  );
};

ClosedMessage.propTypes = {
  horarios: PropTypes.arrayOf(
    PropTypes.shape({
      dia: PropTypes.string.isRequired,
      apertura: PropTypes.string.isRequired,
      cierre: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ClosedMessage;
