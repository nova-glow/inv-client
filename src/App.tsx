import { Container } from '@mui/material';
import AppRouter from './core/AppRouter';

function App() {
  return (
    <Container sx={{ height: '100vh' }}>
      <AppRouter />
    </Container>
  );
}

export default App;
