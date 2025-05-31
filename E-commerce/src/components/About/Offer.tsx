import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const members = [
  {
    name: "Trịnh Xuân Dương",
    role: "Thành viên",
    color: "#1E3A8A",
  },
  {
    name: "Dương Minh Hiển",
    role: "Thành viên",
    color: "#F59E42",
  },
];

const Offer = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#f9f9f9",
        py: 6,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          color: "#1E3A8A",
          mb: 4,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        About Us
      </Typography>
      <Grid container spacing={4} justifyContent="center" maxWidth="md">
        {members.map((member, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 16px rgba(30,58,138,0.08)",
                bgcolor: "#fff",
                minHeight: 220,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: member.color,
                  width: 72,
                  height: 72,
                  mb: 2,
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 56, color: "#fff" }} />
              </Avatar>
              <Typography
                fontWeight={700}
                fontSize="1.3rem"
                color="#1E3A8A"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {member.name}
              </Typography>
              <Typography
                color="#F59E42"
                fontWeight={600}
                fontSize="1rem"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {member.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Offer;