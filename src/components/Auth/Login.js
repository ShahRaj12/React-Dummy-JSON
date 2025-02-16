import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") navigate("/dashboard");
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Login</Typography>
        {error && <Alert severity="error">{error.message}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField 
            fullWidth 
            label="Username" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            margin="normal" 
            variant="outlined" 
            required 
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;