import axios from "axios";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Button,
  Box,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useProductStore from "../../zustand/useProductStore";
import { Category } from "../../data/category";

const CategoryFilter = () => {
  const { filters, setCategoryFilter } = useProductStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(filters.category);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('https://localhost:7183/Categories/getListUse');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError('Không thể lấy dữ liệu category');
      setLoading(false);
    }
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCategoryFilter(category);
  };
  const handleClearSelection = () => {
    setSelectedCategory("");
    setCategoryFilter("");
  };
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        p: 2,
        mb: 2,
        background: "rgba(255,255,255,0.95)",
        boxShadow: "none",
      }}
    >
      <Accordion
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          "& .MuiAccordionSummary-root": {
            background: "linear-gradient(135deg, #1E3A8A 60%, #F59E42 100%)",
            color: "#fff",
            borderRadius: 2,
            minHeight: 48,
            px: 2,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
          <Typography fontWeight={700} fontSize={18} color="#fff">
            Thể Loại
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ background: "#fff", borderRadius: 2 }}>
          <RadioGroup
              value={selectedCategory}
              onChange={handleCategoryChange}
              name="category-filter"
            >
              <Grid container spacing={1}>
                {categories.map((category) => (
                  <Grid item xs={12} key={category.id}>
                    <FormControlLabel
                      value={category.name}
                      control={
                        <Radio
                          sx={{
                            color: "#1E3A8A",
                            '&.Mui-checked': { color: "#F59E42" }
                          }}
                        />
                      }
                      label={
                        <Typography fontWeight={500} color="#1E3A8A">
                          {category.name}
                        </Typography>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
         <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClearSelection}
                sx={{
                  marginTop: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: "#1E3A8A",
                  color: "#1E3A8A",
                  "&:hover": {
                    background: "#F0ECE1",
                    borderColor: "#F59E42",
                    color: "#F59E42"
                  }
                }}
              >
                Bỏ chọn
              </Button>
            </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default CategoryFilter;