import React from 'react';
import LeftBar from './Components/LeftBar';
import Feeds from './Components/Feeds';
import RightBar from './Components/RightBar';
import Navbar from './Components/Navbar';
import { Box, createTheme, Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


function App() {
  const [mode, setMode] = React.useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <LeftBar setMode={setMode} mode={mode} />
          <Feeds />
          <RightBar />
        </Stack>
      </Box>
    </ThemeProvider>
  )
}


export default App;