import { Alert, AlertTitle, Box, Card, CardContent, CardHeader, Chip, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MapUploader from "../Components/MapUploader";
import { GetMapList } from "../Utils/Network";
import config from '../config.json';

function Maps() {
    const [maplist, setMaplist] = useState([]);
    const [isWorking, setWorkingState] = useState(false);

    const onUpload = () => {
        refreshMapList();
    };

    const refreshMapList = () => {
        if (isWorking) return;
        (async () => {
            setWorkingState(true);
            setMaplist([]);

            const maps = await GetMapList();
            if (maps === null) {
                toast.error('Failed to fetch map list, server may be down', config.NOTIFICATIONS);
            }else{
                setMaplist(maps);
            }
            setWorkingState(false);
        })();
    };

    useEffect(() => {
        refreshMapList();
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar />
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
                isWorking ? <>
                    <Box sx={{ mt: 2, p: 2 }} component={Paper} elevation={3}>
                        <CircularProgress />
                    </Box>
                </> : <></>
            }
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
