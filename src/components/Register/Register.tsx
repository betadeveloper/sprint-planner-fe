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
import { post } from '../../api';

import { useForm } from 'react-hook-form';
import theme from '../../theme';
import Copyright from '../Copyright/Copyright';
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    post<{ email: string; password: string }>('/register', {
      email,
      password,
    })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  const password = watch('password');

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
            Register
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
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
              {...register('confirmPassword', {
                validate: (value: any) =>
                  value === password || 'The passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
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
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            By registering, you agree to our
            <Link href="/"> Terms of Service</Link> and
            <Link href="/"> Privacy Policy</Link>.
          </Typography>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}