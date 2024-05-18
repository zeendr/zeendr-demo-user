import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProductsPage from './screens/ProductsPage/ProductsPage';
import CartPage from './screens/CartPage/CartPage';
import CheckoutPage from './screens/CheckoutPage/CheckoutPage';
import SuccessPage from './screens/SuccessPage/SuccessPage';
import AboutPage from './screens/AboutPage/AboutPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import Loader from './components/Loader/Loader'; // Importar el componente Loader

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif'
  }
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Delay de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Mostrar el loader mientras está cargando
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


