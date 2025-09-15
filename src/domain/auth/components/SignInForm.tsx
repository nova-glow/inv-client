import {
  Button,
  Container,
  Typography,
  Card,
  Box,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import SitemarkIcon from '@mui/icons-material/Bookmark'; // Replace with the correct icon or your custom icon path
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../../core/auth/useAuth';

interface FormInputs {
  email: string;
  password: string;
}

const signInSchema = object({
  email: string().email('Please enter a valid email address').required('Email is required'),
  password: string().required('Password is required'),
});

function SignInForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const onSubmit = ({ email, password }: FormInputs) => {
    login(email, password);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card variant="outlined" sx={{ padding: 4, maxWidth: 400 }}>
        <SitemarkIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: '100%',
            textAlign: 'left',
          }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default SignInForm;
