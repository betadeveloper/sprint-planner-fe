import React, { useState } from 'react';
import {
  ThemeProvider,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  CssBaseline,
  Link,
  Grid,
  Avatar,
} from '@mui/material';

import { Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import theme from '../../theme';
import { post } from '../../api';
import Copyright from '../Copyright/Copyright';
import { LoginResponse, FormData } from '../../types/UserTypes';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = (data: FormData) => {
    post('/login', data)
      .then((response) => {
        const loginResponse = response as LoginResponse;
        localStorage.setItem('token', loginResponse.accessToken);
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  React.useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Link href="/">
        <Typography margin={2}>Return to main page</Typography>
      </Link>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#D8DAFF', width: 55, height: 55 }}>
            <Lock sx={{ fontSize: 40, color: '#000' }} />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={'medium'}>
            Login Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'Please enter your email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Please enter your password',
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Need an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
          {errorMessage && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
