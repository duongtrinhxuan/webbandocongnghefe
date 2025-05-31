import { Box } from "@mui/material";
import { Shop } from "../../../data/shop";

interface Props {
  shop: Shop;
}

const MainImage = ({ shop }: Props) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
      {/* Main Image Display */}
      <Box
        component="img"
        src={shop.image}
        alt="Selected Shop"
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