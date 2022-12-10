import { Alert, AlertTitle, Box, Card, CardContent, CardHeader, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import servers from "../servers.json";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { GetServerDetails } from "../Utils/Network";

function Home() {
    const [parsedServers, setServers] = useState([]);

    useEffect(() => {
        (async () => {
            const _servers = [];
            for (const server of servers) {
                const data = await GetServerDetails(server.ip, server.port + 123);
                _servers.push({
                    ...server,
                    data: data
                });
                setServers(_servers);
            }
            setServers(_servers);
        })();
    }, []);

    return (
        <Container>
            <Box>
                <Alert severity="warning">
                    <AlertTitle>Notice</AlertTitle>
                    This website is still under construction.
                </Alert>
            </Box>
            <Grid container sx={{ mt: 2 }} spacing={2}>
                <Grid item xs={12} lg={8}>
                    <Card elevation={3}>
                        <CardHeader title="About" />
                        <CardContent>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card elevation={3}>
                        <CardHeader title="Servers" />
                        <CardContent>
                            {
                                parsedServers.map((server, index) => {
                                    return (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography variant="h6">{server.name}</Typography>
                                            <TableContainer>
                                                <Table size="small">
                                                    <TableBody>
                                                        <TableRow><TableCell>Name</TableCell><TableCell>{server.data.name}</TableCell></TableRow>
                                                        <TableRow><TableCell>IP</TableCell><TableCell>{server.customIp}:{server.data.port}</TableCell></TableRow>
                                                        <TableRow><TableCell>Players</TableCell><TableCell>{server.data.playerCount}/{server.data.playerSlots}</TableCell></TableRow>
                                                        <TableRow><TableCell>Mode</TableCell><TableCell>{server.data.gameType}</TableCell></TableRow>
                                                        <TableRow><TableCell>Protected</TableCell><TableCell>{
                                                            server.data.passworded ?
                                                                <><LockIcon /></> :
                                                                <><LockOpenIcon /></>
                                                        }</TableCell></TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    )
                                })
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;
