import { Box, Grid, Paper } from "@mui/material";
import MainInfo from "./MainInfo";
import MainImage from "./MainImage";
import { Product } from "../../../data/products";

interface Props {
  product: Product;
  idProduct: string;
}

const MainLayout = ({ product, idProduct }: Props) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        py: { xs: 2, md: 6 },
        px: { xs: 0, md: 4 },
        m: 0,
        bgcolor: "linear-gradient(135deg, #1E3A8A 60%, #F59E42 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 5,
          p: { xs: 2, md: 5 },
          background: "#fff",
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          boxShadow: "0 8px 32px rgba(30,58,138,0.16)",
        }}
      >
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                height: "100%",
                p: { xs: 1, md: 3 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <MainInfo product={product} productId={idProduct} />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: "100%",
                p: { xs: 1, md: 3 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MainImage product={product} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MainLayout;