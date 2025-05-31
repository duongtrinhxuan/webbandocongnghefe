import { Box, Grid, Typography, Paper } from "@mui/material";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import { Comment } from "../../../data/comment";
import { useEffect, useState } from "react";
import { fetchComments } from "../../../services/reviewService";
interface Props {
  productId: string;
}

const Reviews = ({ productId }: Props) => {
  const [reviews, setReviews] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments(productId).then((data) => {
      const updatedComments = data.map((comment) => ({
        ...comment,
        productId,
      }));
      setReviews(updatedComments);
    });
  }, [productId]);

  return (
    <Box width="100%" maxWidth={1100} mx="auto" my={4}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          background: "#fff",
          boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={3} color="#1E3A8A">
          Đánh giá
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ReviewSummary reviews={reviews} />
          </Grid>
          <Grid item xs={12} md={8}>
            <ReviewList reviews={reviews} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default Reviews;