import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Badge, keyframes } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export const selectTotalItems = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const AnimatedIcon = styled(ShoppingCartIcon)(({ theme }) => ({
  animation: `${bounce} 2s infinite`
}));

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CartSummary = () => {
  const navigate = useNavigate();
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  if (totalItems === 0) {
    return null;
  }

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        width: 'calc(100% - 32px)',
        bgcolor: '#EDE9DE',
        color: '#333',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledBadge badgeContent={totalItems} color="primary">
          <AnimatedIcon />
        </StyledBadge>
        <Box sx={{ ml: 4 }}>
          <Typography variant="body2" sx={{ color: '#555', fontWeight: 'bold' }}>
            Total Pedido
          </Typography>
          <Typography variant="h6">
            {formatCurrency(totalPrice)}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#FF4D4D',
          '&:hover': {
            bgcolor: '#FF6666',
          },
          borderRadius: '20px',
          
        }}
        onClick={handleViewCart}
      >
        Ordenar
      </Button>
    </Box>
  );
}

export default CartSummary;

