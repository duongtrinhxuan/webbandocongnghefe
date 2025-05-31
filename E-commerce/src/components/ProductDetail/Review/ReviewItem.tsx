import { useState } from "react";
import { Box, Button, Typography, Rating, IconButton, Menu, MenuItem, TextField, Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../../Auth/AuthContext";
import { editComment, deleteComment } from "../../../services/reviewService";
import { CommentDTO } from "../../../data/comment";
interface Props {
  id: string;
  content: string;
  username: string;
  productId: string;
  rating: number;
  date: Date | string;
}

const ReviewItem = ({ id, username, productId, rating, date, content }: Props) => {
  const { user } = useAuth();
  const validDate = date instanceof Date ? date : new Date(date);
  const [comment, setComment] = useState<CommentDTO>({
    id: "",
    content: "",
    userId: "",
    productId: "",
    rating: 0,
    date: new Date(),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedRating, setEditedRating] = useState(rating);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleSave = () => {
    const updatedComment: CommentDTO = {
      id,
      content: editedContent,
      userId: user?.id || "",
      productId,
      rating: editedRating,
      date: new Date(),
    };
    setComment(updatedComment);
    editComment(updatedComment).then(() => {
      window.location.reload();
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setEditedRating(rating);
    setIsEditing(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        p: 2,
        mb: 2,
        background: "#F9FAFB",
        boxShadow: "0 2px 8px rgba(30,58,138,0.04)",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          fontWeight="bold"
          sx={{
            color: user?.accountName === username ? "#1E3A8A" : "inherit",
            fontSize: 18,
          }}
        >
          {username}
        </Typography>
        <Typography color="textSecondary" fontSize={14}>
          {isNaN(validDate.getTime()) ? "No date available" : validDate.toLocaleDateString()}
        </Typography>
        {user?.accountName === username && (
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>
      {isEditing ? (
        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit your review"
            multiline
            rows={3}
            sx={{
              background: "#fff",
              borderRadius: 2,
            }}
          />
          <Rating
            value={editedRating}
            onChange={(_, newValue) => setEditedRating(newValue || 0)}
            size="medium"
            sx={{
              mt: 2,
              "& .MuiRating-iconFilled": {
                color: "#1E3A8A",
              },
              "& .MuiRating-iconEmpty": {
                color: "#F0ECE1",
              },
            }}
          />
          <Box mt={2} display="flex" gap={1}>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ borderRadius: 2 }}>
              Lưu
            </Button>
            <Button variant="outlined" onClick={handleCancel} sx={{ borderRadius: 2 }}>
              Hủy
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#1E3A8A",
              },
              "& .MuiRating-iconEmpty": {
                color: "#F0ECE1",
              },
            }}
          />
          <Typography sx={{ mt: 1, fontSize: 16 }}>{content}</Typography>
        </>
      )}

      {/* Menu for Edit/Delete */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            minWidth: "120px",
            borderRadius: 8,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setIsEditing(true);
          }}
        >
          Sửa
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            deleteComment(id).then(() => {
              window.location.reload();
            });
          }}
        >
          Xóa
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ReviewItem;