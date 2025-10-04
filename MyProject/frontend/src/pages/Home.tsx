import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FastAPI React TypeScript App
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A full-stack application built with FastAPI, PostgreSQL, React, and TypeScript
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          {user ? (
            <Typography variant="h6" color="primary">
              Welcome back, {user.username}!
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/register"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
