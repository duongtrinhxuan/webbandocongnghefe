import { Box, Typography, LinearProgress, Rating, Paper } from "@mui/material";

interface Comment {
  id: string;
  content: string;
  username: string;
  productId: string;
  rating: number;
  date: Date;
}

interface Props {
  reviews: Comment[];
}

const ReviewSummary = ({ reviews }: Props) => {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;
  const ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  reviews.forEach((review) => {
    ratingCounts[review.rating] += 1;
  });

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p: 3,
        background: "#fff",
        boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
        mb: 2,
      }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="700" color="#1E3A8A">
          {totalReviews} đánh giá
        </Typography>
      </Box>

      {/* Content Section */}
      <Box display="flex" alignItems="center">
        {/* Average Rating */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mr={3}
        >
          <Typography variant="h2" fontWeight={700} color="#F59E42" sx={{ mb: 0.5 }}>
            {averageRating.toFixed(1)}
          </Typography>
          <Rating
            value={averageRating}
            readOnly
            precision={0.2}
            size="large"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#1E3A8A",
              },
              "& .MuiRating-iconEmpty": {
                color: "#F0ECE1",
              },
            }}
          />
        </Box>

        {/* Star Rating Breakdown */}
        <Box flex="1">
          {Object.entries(ratingCounts)
            .reverse()
            .map(([stars, count]) => (
              <Box key={stars} display="flex" alignItems="center" mb={1}>
                <Typography whiteSpace="nowrap" width="38px" fontWeight={600} color="#1E3A8A">
                  {stars} ★
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={totalReviews > 0 ? (count / totalReviews) * 100 : 0}
                  sx={{
                    flexGrow: 1,
                    mx: 1,
                    height: 10,
                    borderRadius: 5,
                    background: "#F0ECE1",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#F59E42",
                    },
                  }}
                />
                <Typography fontWeight={600} color="#1E3A8A">{`(${count})`}</Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default ReviewSummary;