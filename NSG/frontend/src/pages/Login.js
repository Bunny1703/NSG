import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Container,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(credentials);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ 
          width: '100%', 
          maxWidth: 400, 
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          background: 'linear-gradient(145deg, #1E1E1E 0%, #121212 100%)',
          border: '1px solid #333'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 3
            }}>
              <Box sx={{ 
                backgroundColor: 'primary.main', 
                borderRadius: '50%', 
                p: 1,
                mb: 2
              }}>
                <LockOutlinedIcon fontSize="large" />
              </Box>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                NSG Surveillance System
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Secure Authentication
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5,
                  background: 'linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #33CCFF 0%, #00BFFF 100%)',
                  }
                }}
              >
                Sign In
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  For authorized personnel only. This system is monitored.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;