import { Box, Button, Container, createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Team from "./Pages/Team";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4433',
    },
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Header onChangeTab={setTabPage} pages={pages} />
        <Paper>
          <Box sx={{ p: 2 }}>
            {pages[tabPage].component}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
