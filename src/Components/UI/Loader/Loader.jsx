import React from 'react';
import './loader.css';
import { useTheme } from '@mui/material';

const Loader = () => {
  const theme = useTheme();
  
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.text.main,
      }}
    >
      <div className='loader'></div>
    </div>
  );
};

export default Loader;
