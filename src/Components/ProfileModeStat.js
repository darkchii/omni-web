import { Box, Card, CardContent, Typography } from "@mui/material";

function ProfileModeStat(props) {
    return (
        <>
            <Card elevation={2}>
                <CardContent>
                    <Box>
                        <Typography variant="h6">{props.gamemode}</Typography>
                        <Typography variant="h4">{props.stats?.points?.toLocaleString('en-US') ?? 0}</Typography>
                        <Typography variant="subtitle2">Points</Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileModeStat;
