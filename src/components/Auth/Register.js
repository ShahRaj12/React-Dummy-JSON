import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress } from "@mui/material";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") navigate("/login");
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Register</Typography>
        {error && <Alert severity="error">{error.message}</Alert>}
        <form onSubmit={handleRegister}>
          <TextField 
            fullWidth 
            label="First Name" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} 
          />
          <TextField 
            fullWidth 
            label="Last Name" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} 
          />
          <TextField 
            fullWidth 
            label="Username" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
          />
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
