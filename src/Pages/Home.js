import { Alert, AlertTitle, Box, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";

function Home() {
    return (
        <Box>
            <Alert severity="warning">
                <AlertTitle>Notice</AlertTitle>
                This website is still under construction.
            </Alert>
        </Box>
    );
}

export default Home;
