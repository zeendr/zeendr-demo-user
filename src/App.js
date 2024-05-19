// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProductsPage from './screens/ProductsPage/ProductsPage';
import CartPage from './screens/CartPage/CartPage';
import CheckoutPage from './screens/CheckoutPage/CheckoutPage';
import SuccessPage from './screens/SuccessPage/SuccessPage';
import AboutPage from './screens/AboutPage/AboutPage';
import ClosedMessage from './screens/ClosedMessage/ClosedMessage';
import { Provider } from 'react-redux';
import store from './redux/store';
import Loader from './components/Loader/Loader';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif'
  }
});

function App() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('https://domicilios-madriguera-ac104c9fedbe.herokuapp.com/horarios');
        setHorarios(response.data);
      } catch (error) {
        console.error('Error fetching horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Delay de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('es-ES', { weekday: 'long' });
      const currentTime = now.toTimeString().slice(0, 5);

      const todayHorario = horarios.find(horario => horario.dia.toLowerCase() === currentDay.toLowerCase());
      
      if (todayHorario) {
        const { apertura, cierre } = todayHorario;
        if (apertura <= currentTime && currentTime <= cierre) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } else {
        setIsOpen(false); // Si no hay horario definido para hoy, asumir que está cerrado
      }
    };

    if (horarios.length > 0) {
      checkIfOpen();
    }
  }, [horarios]);

  if (loading) {
    return <Loader />; // Mostrar el loader mientras está cargando
  }

  if (!isOpen) {
    return <ClosedMessage horarios={horarios} />; // Pasar los horarios como props a ClosedMessage
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
