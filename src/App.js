import { Box } from '@mui/material';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom' ;
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
function App() {


  return (
    <BrowserRouter>
    <Box sx={{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh",
    }}>
      <Header/>
      <Routes>
        <Route path='/' exact element={<Homepage/>}></Route>
        <Route path='/coins/:id' exact element={<Coinpage/>}></Route>
      </Routes>
    </Box>
    </BrowserRouter>
  );
}

export default App;
