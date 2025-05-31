import { Box } from "@mui/material";
import { Product } from "../../../data/products";

interface Props {
  product: Product;
}
const MainImage = ({ product }: Props) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
      {/* Main Image Display */}
      <Box
        component="img"
        src={product.image}
        alt="Selected Product"
        sx={{
          width: "100%",
          aspectRatio: 1,
          objectFit: "cover",
          borderRadius: 5,
          boxShadow: 3,
          background: "#fff",
          border: "2px solid #F0ECE1",
        }}
      />
    </Box>
  );
};
export default MainImage;