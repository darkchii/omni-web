import { Alert, AlertTitle, Box, Card, CardContent, CardHeader, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MapUploader from "../Components/MapUploader";
import { GetMapList } from "../Utils/Network";

function Maps() {
    const [maplist, setMaplist] = useState([]);
    const [isWorking, setWorkingState] = useState(false);

    const onUpload = () => {
        console.log('Map uploaded');
        refreshMapList();
    };

    const refreshMapList = () => {
        if (isWorking) return;
        (async () => {
            setMaplist([]);

            const maps = await GetMapList();
            console.log(maps);
            setMaplist(maps);
        })();
    };

    useEffect(() => {
        refreshMapList();
    }, []);

    return (
        <>
            <Box>
                <Alert severity="error">
                    <AlertTitle>Notice</AlertTitle>
                    The map database is currently not finished.
                </Alert>
            </Box>
            <Box sx={{ mt: 2, p: 2 }} component={Paper} elevation={3}>
                <MapUploader onUpload={onUpload} />
            </Box>
            {
                maplist !== null && maplist.length > 0 ? <>
                    <Box sx={{ mt: 2, p: 2 }} component={Paper} elevation={3}>
                        <Typography variant='h5'>Map List</Typography>
                        <TableContainer>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Mode</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Uploaded on</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        maplist.map((map, index) => {
                                            return <TableRow key={index}>
                                                <TableCell>{map.id}</TableCell>
                                                <TableCell><Chip label={map.gamemode} /></TableCell>
                                                <TableCell>{map.name}</TableCell>
                                                <TableCell>{map.upload_date}</TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </> : <></>
            }
        </>
    );
}

export default Maps;
