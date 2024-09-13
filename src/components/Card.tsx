import React from 'react';
import { Box, Typography } from '@mui/material';

interface CardProps {
    text: string;
}

const Card: React.FC<CardProps> = ({ text }) => {
    return (
        <Box
            sx={{
                p: 1,
                mb: 1,
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography>{text}</Typography>
        </Box>
    );
};

export default Card;
