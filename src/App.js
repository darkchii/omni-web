import { Box, Button, Container, createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import BackgroundImage from "./Images/bg.png";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4433',
    },
    background: {
      default: `#00000000`,
    }
  },
});

function App() {
  const [tabPage, setTabPage] = useState(0);

  const pages = [
    {
      name: "Home",
      component: <Home />
    },
    {
      name: "Team",
      component: <Team />
    }
  ];

  return (
    <Box sx={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Header onChangeTab={setTabPage} pages={pages} />
          <Paper sx={{ borderRadius: 0 }}>
            <Box sx={{ p: 2 }}>
              {pages[tabPage].component}
            </Box>
          </Paper>
          <Footer />
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export default App;
