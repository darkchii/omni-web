import { Alert, AlertTitle, Box, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";

function Join() {
    return (
        <Box>
            <Alert severity="error">
                <AlertTitle>Notice</AlertTitle>
                Join requests are currently closed. Please check back later.
            </Alert>
        </Box>
    );
}

export default Join;
