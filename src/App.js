import React from 'react';
import LeftBar from './Components/LeftBar';
import Feeds from './Components/Feeds';
import RightBar from './Components/RightBar';
import Navbar from './Components/Navbar';
import { Box, createTheme, Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Items from './Pages/Items';
import Customers from './Pages/Customers';
import Traders from './Pages/Traders';
import Invoices from './Pages/Invoices';
import  Home  from './Pages/Home';


function App() {
  const [mode, setMode] = React.useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <Router>
    <ThemeProvider theme={darkTheme}>
      
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <LeftBar setMode={setMode} mode={mode} />
          <Feeds>
              <Routes>
                <Route path='/home' elements={<Home/>}/>
                <Route path='/items' element={<Items/>}/>
                <Route path='/customers' element={<Customers/>}/>
                <Route path='/invoices' element={<Invoices/>}/>
                <Route path='/traders' element={<Traders/>}/>
              </Routes>
            </Feeds>
        </Stack>
      </Box>
    </ThemeProvider>
    </Router>
  )
}


export default App;