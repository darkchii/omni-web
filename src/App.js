import { Box, Button, Container, createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import BackgroundImage from "./Images/bg.png";
import Maps from "./Pages/Maps";
import Join from "./Pages/Join";

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
    },
    {
      name: "Maps",
      component: <Maps />
    },
    {
      name: "Join",
      component: <Join />
    }
  ];

  return (
    <Box sx={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', height: '100%', minHeight: '100vh', backgroundAttachment: 'fixed' }}>
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
