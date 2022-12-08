import { Alert, AlertTitle, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { GetMapDetails, SubmitMap } from "../Utils/Network";

function MapUploader(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [mapDetails, setMapDetails] = useState(null);
    const [error, setError] = useState(null);
    const [working, setWorkingState] = useState(false);

    const handleMapUpload = () => {
        setWorkingState(true);
        setError(null);
        (async () => {
            const res = await SubmitMap(selectedFile);
            console.log(res);
            setWorkingState(false);
            setSelectedFile(null);
            setMapDetails(null);
            if(res.status==='fail'){
                setError(res.message);
                return;
            }
            props.onUpload?.();
        })();
    };

    const handleFileSelect = (event) => {
        setWorkingState(true);
        setError(null);
        setSelectedFile(event.target.files[0]);

        if (event.target.files[0].size > 2e+7) { //20mb
            setError('File too big, the maximum file size is 20MB');
            setWorkingState(false);
            return;
        }

        if (event.target.files[0].type !== 'application/zip' && event.target.files[0].type !== 'application/x-zip-compressed') {
            setError('File type not supported, only .zip files are supported');
            setWorkingState(false);
            return;
        }

        (async () => {
            const _mapDetails = await GetMapDetails(event.target.files[0]);
            if (_mapDetails === null) {
                setMapDetails(null);
                setError('Error getting map details');
                setWorkingState(false);
                return;
            }
            console.log(_mapDetails);
            setMapDetails(_mapDetails.data);
            setWorkingState(false);
        })();
    };

    return (
        <>
            <Alert severity="info">
                If you wish to reupload/update a map, please contact lecc.
            </Alert>
            <Box display='inline-block' sx={{mt:1}}>
                <Button disabled={working} variant='outlined' component="label">
                    Upload Map
                    <input
                        type="file"
                        hidden
                        accept=".zip"
                        onChange={handleFileSelect}
                    />
                </Button>
            </Box>
            <Box sx={{ ml: 1 }} display='inline-block'>
                <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>{selectedFile !== null ? selectedFile.name : "No map selected"}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                {
                    error === null ?
                        (selectedFile !== null && mapDetails !== null ? <>
                            <TableContainer>
                                <Table size='small'>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={2}><b>File Details</b></TableCell></TableRow>
                                        <TableRow>
                                            <TableCell>Size</TableCell>
                                            <TableCell>{Math.round(selectedFile.size / 1048576 * 100) / 100} MB</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Map Name</TableCell>
                                            <TableCell>{mapDetails.meta.info[0].name[0]}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Author</TableCell>
                                            <TableCell>{mapDetails.meta.info[0].author[0]}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>File Count</TableCell>
                                            <TableCell>{mapDetails.fileCount} ({mapDetails.meta.script.length} scripts, {mapDetails.meta.file.length} files)</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ mt: 1 }}>
                                <Button disabled={working} size='small' variant='contained' onClick={handleMapUpload}>Upload</Button>
                            </Box>
                        </> : <></>) : <>
                            <Alert severity="error">
                                <AlertTitle>Notice</AlertTitle>
                                {error}
                            </Alert>
                        </>
                }
            </Box>
        </>
    );
}

export default MapUploader;
