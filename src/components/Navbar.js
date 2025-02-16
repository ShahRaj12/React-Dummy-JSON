import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>My App</Typography>
        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;