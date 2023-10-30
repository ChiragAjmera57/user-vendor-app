// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h2" gutterBottom>
          Welcome to My App
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          A great place to get started!
        </Typography>
        <Link to="/user" style={{ textDecoration: 'none',marginBottom:'5px' }}>
          <Button variant="contained" color="primary" size='large'>
            User Page
          </Button>
        </Link>
        {/* <Divider variant="middle" /> */}
        <Link to="/vendor" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" >
            Vendor Page
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
