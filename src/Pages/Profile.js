import { Alert, AlertTitle, Avatar, Box, Button, Card, CardContent, CardHeader, Chip, CircularProgress, Container, FormGroup, Grid, Modal, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import servers from "../servers.json";
import LockIcon from '@mui/icons-material/Lock';
import { GetUser, LoginUser, LogoutUser, RegisterUser, IsUserLoggedInUnsafe, GetLoginID, GetUserAvatar, UpdateUserProfile } from "../Utils/Network";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config.json";

import PlaceholderProfilePic from "../Images/profilepic_placeholder.png";
import ProfileModeStat from "../Components/ProfileModeStat";

const ROLES = {
    "admin": {
        name: "Admin",
        color: "red"
    },
    "donator": {
        name: "Donator",
        color: "blue"
    }
}

function Profile(props) {
    const [account, setAccount] = useState(null);
    const [isWorking, setWorkingState] = useState(false);
    const [allowEdit, setAllowEdit] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    const loadUser = () => {
        setAccount(null);
        setAllowEdit(false);
        setWorkingState(true);
        if (props.user === undefined) {
            toast.error("Invalid profile", config.NOTIFICATIONS);
            setWorkingState(false);
            return;
        }

        (async () => {
            const _user = await GetUser(props.user);
            if (_user === null) {
                toast.error("Invalid profile", config.NOTIFICATIONS);
                setWorkingState(false);
                return;
            }

            if (await IsUserLoggedInUnsafe()) {
                setAllowEdit(GetLoginID().toString() === _user.user.id.toString());
            }

            setAccount(_user.user);
            setWorkingState(false);
        })();
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar />
            {
                isWorking ?
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                    </> : <>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                {
                                    allowEdit && <>
                                        <Button onClick={() => setShowEditor(true)} fullWidth variant="contained" color="primary">Edit Profile</Button>
                                    </>
                                }
                                <Card elevation={2} sx={{ mt: 1 }}>
                                    <CardContent>
                                        <Box sx={{ p: 4 }}>
                                            <Box sx={{ width: '100%', position: 'relative', pt: '100%' }}>
                                                <Avatar src={GetUserAvatar(account?.id)} sx={{ width: '100%', height: '100%', position: 'absolute', color: 'white', top: 0 }}>{account?.username.charAt(0).toUpperCase()}</Avatar>
                                            </Box>
                                        </Box>
                                        <Typography variant="h4" component="h1">{account?.username}</Typography>
                                        <Typography variant="subtitle2">(IGN: {account?.username_game ?? <i>n/a</i>})</Typography>
                                        <Typography variant="h6">${account?.money.toLocaleString('en-US')}</Typography>
                                        {
                                            account?.roles?.map((role) => {
                                                return (
                                                    <Chip label={ROLES[role].name} />
                                                )
                                            })
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}><ProfileModeStat gamemode='Deathmatch' stats={account?.stats?.dm} /></Grid>
                                    <Grid item xs={6} md={3}><ProfileModeStat gamemode='Deathmatch' stats={account?.stats?.dd} /></Grid>
                                    <Grid item xs={6} md={3}><ProfileModeStat gamemode='Race' stats={account?.stats?.race} /></Grid>
                                    <Grid item xs={6} md={3}><ProfileModeStat gamemode='Hunter' stats={account?.stats?.hunter} /></Grid>
                                    <Grid item xs={6} md={3}><ProfileModeStat gamemode='Trucking' stats={account?.stats?.trucking} /></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {allowEdit && <ProfileEditor onClose={(refetch) => { setShowEditor(false); loadUser(); }} open={showEditor} auth={props.auth} account={account} />}
                    </>
            }
        </>
    );
}

export default Profile;

const MODAL_STYLE = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};


function ProfileEditor(props) {
    const [open, setOpen] = useState(false);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
    const [selectedProfilePictureFile, setSelectedProfilePictureFile] = useState(null);
    const [working, setWorkingState] = useState(false);

    const onProfilePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedProfilePictureFile(e.target.files[0]);
            setSelectedProfilePicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    const updateProfile = async () => {
        if (working) return;
        setWorkingState(true);

        const result = await UpdateUserProfile(props.auth, props.account, {
            avatar: selectedProfilePictureFile
        });

        if (result === null) {
            toast.error("An error occured", config.NOTIFICATIONS);
        } else {
            toast.success(`Updated profile`, config.NOTIFICATIONS);

            for (const data of result.updated_data) {
                console.log(data);
                if (data.success === false) {
                    toast.error(`${data.datapoint}: ${data.message}`, config.NOTIFICATIONS);
                }
            }
        }

        close();

        setWorkingState(false);
    };

    const reset = () => {
        setSelectedProfilePicture(null);
    };

    const close = () => {
        setOpen(false);
        props.onClose?.(true);
        reset();
    }

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const AVA_SIZE = '4rem';

    return (
        <>
            <Modal open={open}>
                <Box component={Paper} sx={{ ...MODAL_STYLE, width: 800 }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">Profile Editor</Typography>
                    <Box display='inline-block' sx={{ mt: 1, minWidth: '100%' }}>
                        <Stack spacing={2}>
                            <Paper sx={{ p: 1 }} elevation={2}>
                                <Typography variant="h6">Profile Picture</Typography>
                                <Stack direction="row" spacing={2}>
                                    {
                                        selectedProfilePicture !== null ? <>
                                            <Avatar src={selectedProfilePicture} sx={{ width: AVA_SIZE, height: AVA_SIZE }} />
                                        </> : <>
                                            <Avatar src={GetUserAvatar(props.account.id)} sx={{ width: AVA_SIZE, height: AVA_SIZE, color: 'white' }}>{props.account.username.charAt(0).toUpperCase()}</Avatar>
                                        </>
                                    }
                                    <Box sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', direction: 'column' }}>
                                        <Button disabled={working} sx={{ height: '2rem' }} variant='outlined' component="label">
                                            Upload profile picture
                                            <input type="file" hidden accept="image/png, image/jpeg" onChange={onProfilePictureChange} />
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper sx={{ p: 1 }} elevation={2}>
                                <Typography variant="h6">Header Image</Typography>
                                <Stack direction="row" spacing={2}>
                                    <Box sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', direction: 'column' }}>
                                        <Button disabled={working} sx={{ height: '2rem' }} variant='outlined' component="label">
                                            Upload header image
                                            <input type="file" hidden accept="image/png, image/jpeg" />
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Stack direction="row" spacing={2}>
                                <Button disabled={working} onClick={() => { updateProfile(); }} variant='contained' color='primary'>Save</Button>
                                <Button disabled={working} onClick={() => { close(); }} variant='contained' color='secondary'>Close</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}