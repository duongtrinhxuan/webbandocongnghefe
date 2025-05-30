import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";


const Layout_admin = () => {
  return (
    <Box>     
      <Outlet />
    </Box>
  );
};

export default Layout_admin;
