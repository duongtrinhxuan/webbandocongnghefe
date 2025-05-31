import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { createTheme, ThemeProvider, Box, Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
    fontWeightRegular: 800,
  },
});

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: 320,
      }}
    >
      <Link
        key={product.id}
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}
      >
        <Card
          sx={{
            width: 260,
            minHeight: 340,
            textAlign: "center",
            background: "#fff",
            borderRadius: 4,
            boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
            border: "1px solid #F0ECE1",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-6px) scale(1.03)",
              boxShadow: "0 8px 32px rgba(30,58,138,0.16)",
              borderColor: "#F59E42",
            },
            cursor: "pointer",
            mx: "auto",
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            sx={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 3,
              objectFit: "cover",
              mt: 2,
            }}
          />
          <CardContent sx={{ px: 2, py: 1 }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1E3A8A",
                mb: 0.5,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              title={product.productName}
            >
              {product.productName.toUpperCase()}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" mt={0.5}>
              <Rating
                value={product.rating}
                readOnly
                precision={0.5}
                size="small"
              />
            </Box>
            <Typography
              sx={{
                color: "#E600A0",
                fontSize: 20,
                mt: 1,
                fontWeight: 800,
              }}
            >
              {product.unitPrice} VND
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  </ThemeProvider>
);

export default ProductCard;