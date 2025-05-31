import React, { useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material";
import ReviewItem from "./ReviewItem";

interface Props {
  reviews: Array<{
    id: string;
    content: string;
    username: string;
    productId: string;
    rating: number;
    date: Date;
  }>;
}

const REVIEWS_PER_PAGE = 6;

const ReviewList = ({ reviews }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p: 3,
        background: "#fff",
        boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
      }}
    >
      {reviews.slice(startIndex, endIndex).map((review, index) => (
        <React.Fragment key={index}>
          <ReviewItem {...review} />
          {index < REVIEWS_PER_PAGE - 1 &&
            index + startIndex < reviews.length - 1 && (
              <Divider sx={{ marginBottom: "25px" }} />
            )}
        </React.Fragment>
      ))}

      {/* Pagination Component */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          variant="outlined"
          count={Math.ceil(reviews.length / REVIEWS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: 2,
              fontWeight: 600,
              color: "#1E3A8A",
              borderColor: "#1E3A8A",
            },
            "& .Mui-selected": {
              background: "#F59E42",
              color: "#fff",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default ReviewList;