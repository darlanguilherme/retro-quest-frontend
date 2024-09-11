import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ p: 2, mt: 'auto', bgcolor: '#333', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">Footer</Typography>
    </Box>
  );
};

export default Footer;
