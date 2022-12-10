import { Box, Button, Container, createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import BackgroundImage from "./Images/bg.png";
import Maps from "./Pages/Maps";
import Join from "./Pages/Join";
import Login from "./Pages/Login";
import { IsUserLoggedInUnsafe } from "./Utils/Network";
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";

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
  const [auth, setAuth] = useState(null);
  const [tabPage, setTabPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  const updatePages = () => {
    const _pages = [
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
      },
      {
        name: "Login",
        component: <Login onSuccess={() => { setTabPage(0); setForceUpdate(Math.random()); }} />,
        visibility: auth === null
      },
      {
        name: "Profile",
        component: <Profile auth={auth} user={auth?.user_id} />,
        visibility: auth !== null
      },
      {
        name: "Logout",
        component: <Logout onSuccess={() => { setTabPage(0); setForceUpdate(Math.random()); }} />,
        visibility: auth !== null
      }
    ]
    setPages(_pages.filter(page => page.visibility !== false));
  }

  useEffect(() => {
    (async () => {
      if (await IsUserLoggedInUnsafe()) {
        setAuth({
          token: localStorage.getItem('auth_token'),
          user_id: localStorage.getItem('auth_user_id')
        });
      } else {
        updatePages();
      }
    })();
  }, [forceUpdate]);

  useEffect(() => {
    updatePages();
  }, [auth]);

  return (
    <Box sx={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', height: '100%', minHeight: '100vh', backgroundAttachment: 'fixed' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Header onChangeTab={setTabPage} pages={pages} />
          <Paper sx={{ borderRadius: 0 }}>
            <Box sx={{ p: 2 }}>
              {pages.length > 0 ? pages[tabPage].component : <></>}
            </Box>
          </Paper>
          <Footer />
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export default App;
