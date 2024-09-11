import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const Login: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <Typography variant="h4">Login Page</Typography>
      <TextField label="Username" variant="outlined" margin="normal" />
      <TextField label="Password" type="password" variant="outlined" margin="normal" />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
    </Box>
  );
};

export default Login;
