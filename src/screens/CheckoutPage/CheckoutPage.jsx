import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Paper, Divider, CircularProgress, Backdrop } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import deliveryCosts from '../../data/barrios';
import QRCode from '../../assets/QR2.jpg';
import { clearCart } from '../../redux/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [neighborhoodCost, setNeighborhoodCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleNeighborhoodChange = (event) => {
    const selectedNeighborhood = event.target.value;
    setNeighborhood(selectedNeighborhood);
    setNeighborhoodCost(deliveryCosts[selectedNeighborhood]);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setReceipt(null);
  };

  const handleReceiptUpload = (event) => {
    setReceipt(event.target.files[0]);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      valid = false;
      errors.name = 'El nombre es requerido';
    }
    if (!email) {
      valid = false;
      errors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      errors.email = 'El correo electrónico no es válido';
    }
    if (!phone) {
      valid = false;
      errors.phone = 'El número de teléfono es requerido';
    } else if (!/^\d{10}$/.test(phone)) {
      valid = false;
      errors.phone = 'El número de teléfono debe tener 10 dígitos';
    }
    if (!address) {
      valid = false;
      errors.address = 'La dirección es requerida';
    }
    if (!neighborhood) {
      valid = false;
      errors.neighborhood = 'El barrio es requerido';
    }
    if (!paymentMethod) {
      valid = false;
      errors.paymentMethod = 'El método de pago es requerido';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('nombre_completo', name);
    formData.append('numero_telefono', phone);
    formData.append('correo_electronico', email);
    formData.append('direccion', address);
    formData.append('barrio', neighborhood);
    formData.append('productos', JSON.stringify(cartItems));
    formData.append('metodo_pago', paymentMethod);
    if (receipt) {
      formData.append('comprobante', receipt);
    }

    try {
      const response = await axios.post('https://domicilios-madriguera-ac104c9fedbe.herokuapp.com/pedido', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        dispatch(clearCart());
        navigate('/success', { state: { name } });
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Paper elevation={0} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Información del Pedido
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre y Apellido"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Número de Teléfono"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Dirección"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
        />
        <FormControl variant="outlined" error={!!errors.neighborhood}>
          <InputLabel>Barrio</InputLabel>
          <Select
            value={neighborhood}
            onChange={handleNeighborhoodChange}
            label="Barrio"
          >
            {Object.keys(deliveryCosts).map((neigh, index) => (
              <MenuItem key={index} value={neigh}>
                {neigh}
              </MenuItem>
            ))}
          </Select>
          {errors.neighborhood && <Typography variant="body2" color="error">{errors.neighborhood}</Typography>}
        </FormControl>
        <FormControl variant="outlined" error={!!errors.paymentMethod}>
          <InputLabel>Método de Pago</InputLabel>
          <Select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            label="Método de Pago"
          >
            <MenuItem value="Efectivo">Efectivo</MenuItem>
            <MenuItem value="Transferencia">Transferencia</MenuItem>
          </Select>
          {errors.paymentMethod && <Typography variant="body2" color="error">{errors.paymentMethod}</Typography>}
        </FormControl>
        {paymentMethod === 'Transferencia' && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Realiza tu pago escaneando el código QR
            </Typography>
            <img src={QRCode} alt="QR Code" style={{ width: 200, height: 200 }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Total a pagar: {formatCurrency(totalPrice + neighborhoodCost)}
            </Typography>
            <Typography variant="body1">
              Número de cuenta: 86262257101 Ahorros Bancolombia
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Cargar Comprobante
              <input
                type="file"
                hidden
                onChange={handleReceiptUpload}
              />
            </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {receipt ? receipt.name : 'Por favor, carga el comprobante de pago'}
            </Typography>
          </Box>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Resumen del Pedido
        </Typography>
        <Box sx={{ mb: 2 }}>
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1">{item.quantity} x {item.name}</Typography>
              <Typography variant="body1">{formatCurrency(item.price * item.quantity)}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">Domicilio</Typography>
            <Typography variant="body1">{formatCurrency(neighborhoodCost)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FF4D4D' }}>Total</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FF4D4D' }}>{formatCurrency(totalPrice + neighborhoodCost)}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{ bgcolor: '#FF4D4D', '&:hover': { bgcolor: '#FF6666' }, borderRadius: '16px', mt: 2 }}
          onClick={handleSubmit}
          disabled={isLoading || (paymentMethod === 'Transferencia' && !receipt)} // Deshabilitar si está cargando o si es transferencia y no hay comprobante
        >
          Confirmar Pedido
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: '#FF4D4D', color: '#FF4D4D', '&:hover': { borderColor: '#FF6666', color: '#FF6666' }, borderRadius: '16px', mt: 1 }}
          onClick={handleContinueShopping}
        >
          Sigue Comprando
        </Button>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default CheckoutPage;

