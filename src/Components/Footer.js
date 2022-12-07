import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";

function Footer(props) {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>&copy; 2015 - { new Date().getFullYear() } omnidirectionalfive.com &bull; Website made by lecc</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Footer;
