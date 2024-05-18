// src/screens/ProductsPage/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import ProductModal from '../../components/ProductModal/ProductModal';
import Header from '../../components/Header/Header';
import CartSummary, { selectTotalItems } from '../../components/CartSummary/CartSummary';
import Footer from '../../components/Footer/Footer'; // Importar el componente Footer
import { useSelector } from 'react-redux';

import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';
import logo from '../../assets/logo2.png';

const CategoryButton = styled(Button)({
  color: '#333',
  borderColor: '#333',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '20px',
  padding: '8px 16px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [banner1, banner2, banner3];
  const totalItems = useSelector(selectTotalItems);

  useEffect(() => {
    axios.get('https://domicilios-madriguera-ac104c9fedbe.herokuapp.com/productos')
      .then(response => {
        setProducts(response.data);
        const uniqueCategories = new Set(response.data.map(product => product.categoria));
        setCategories(['Todos', ...uniqueCategories]);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner(prevBanner => (prevBanner + 1) % banners.length);
    }, 7000); // Cambiar cada 10 segundos

    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const renderCategorySection = (category) => {
    const filteredProducts = products.filter(product => product.categoria === category);
    return (
      <Box key={category}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#333', fontWeight: 'bold' }}>
          {category}
        </Typography>
        <Grid container spacing={2}>
          {filteredProducts.map(product => (
            <Grid item xs={6} sm={6} key={product.id} onClick={() => handleOpenModal(product)}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: 250, position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={product.imagen_url}
                  alt={product.nombre}
                  sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <CardContent sx={{ mt: 'auto', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: 2, position: 'absolute', bottom: 0 }}>
                  <Typography variant="h6" component="div">
                    {product.nombre}
                  </Typography>
                  <Typography variant="body1">
                     {formatCurrency(product.precio)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2, pb: totalItems > 0 ? 14 : 2 }}>
      <Header logo={logo} />

      <TextField 
        fullWidth 
        label="Buscar productos" 
        variant="outlined" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        InputProps={{
          endAdornment: <SearchIcon />
        }}
      />
      <Box sx={{ my: 2 }}>
        <img src={banners[currentBanner]} alt="Special Offer" style={{ width: '100%', borderRadius: '10px' }} />
      </Box>
      <Box sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        {categories.map((category, index) => (
          <CategoryButton key={index} variant="outlined" sx={{ backgroundColor: '#F0E8DD', fontWeight: 'bold'}} onClick={() => handleCategoryClick(category)}>
            {category}
          </CategoryButton >
        ))}
      </Box>
      {selectedCategory === 'Todos' ? categories.filter(c => c !== 'Todos').map(renderCategorySection) : renderCategorySection(selectedCategory)}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
      {totalItems > 0 && <CartSummary />}
      {totalItems === 0 && <Footer />}  {/* Mostrar el componente Footer solo si no hay items en el carrito */}
    </Box>
  );
}

export default ProductsPage;


