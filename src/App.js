import Home from './pages/Home/Home'
import { SnackbarProvider } from 'notistack';
import { styled } from 'goober';
function App() {
  return (
    <SnackbarProvider >
      <div style = {{backgroundColor : 'black'}}>
        <Home />
      </div>
    </SnackbarProvider>
  );
}

export default App;