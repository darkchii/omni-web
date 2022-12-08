import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import Logo from '../Images/logo.png';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Header(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onChangeTab(newValue);
    };

    return (
        <>
            <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <Box component='img' src={Logo} alt='Logo' sx={{ height: '10rem', my: 2 }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Omnidirectional Five</Typography>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {
                                    props.pages.map((page, index) => {
                                        if(page.visibility === false) return <></>;
                                        return <Tab label={page.name} {...a11yProps(index)} />
                                    })
                                }
                            </Tabs>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;
