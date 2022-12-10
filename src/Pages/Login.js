import { Alert, AlertTitle, Box, Button, Card, CardContent, CardHeader, Container, FormGroup, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import servers from "../servers.json";
import LockIcon from '@mui/icons-material/Lock';
import { LoginUser, RegisterUser } from "../Utils/Network";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';

function Login() {
    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);

    const [registerUsername, setRegisterUsername] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState(null);

    const [isWorking, setWorkingState] = useState(false);

    const showNotification = (title, message, severity) => {
        toast[severity](message, config.NOTIFICATIONS);
    };

    const login = () => {
        (async () => {
            setWorkingState(true);

            const response = await LoginUser(loginUsername, loginPassword);
            if (response === null) {
                showNotification('Error', 'An error occured while trying to login. Please try again later.', 'error');
            } else if (response.status === 'fail') {
                showNotification('Error', response.message, 'error');
            } else {
                showNotification('Success', 'You have successfully logged in.', 'success');
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('auth_user_id', response.user_id);
                window.location.reload(false);
            }

            setWorkingState(false);
        })();
    };

    const register = () => {
        (async () => {
            setWorkingState(true);

            if (registerPassword !== registerConfirmPassword) {
                showNotification('Error', 'Passwords do not match.', 'error');
                setWorkingState(false);
                return;
            }

            const response = await RegisterUser(registerUsername, registerPassword);
            if (response === null) {
                showNotification('Error', 'An error occured while trying to register. Please try again later.', 'error');
            } else if (response.status === 'fail') {
                showNotification('Error', response.message, 'error');
            } else {
                showNotification('Success', 'You have successfully registered. You can now login.', 'success');
            }


            console.log(response);
            setWorkingState(false);
        })();
    };

    return (
        <Container>
            <ToastContainer hideProgressBar />
            <Grid>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant='h5'>Login</Typography>
                        <Grid container>
                            <Grid item lg={3} xs={12}></Grid>
                            <Grid item lg={6} xs={12}>
                                <Box component='form'>
                                    <TextField label="Username" variant="standard" fullWidth required autoComplete='new-password' onChange={e => setLoginUsername(e.target.value)} />
                                    <TextField sx={{ mt: 1 }} label="Password" variant="standard" fullWidth type='password' required autoComplete='new-password' onChange={e => setLoginPassword(e.target.value)} />
                                    <Button disabled={isWorking} sx={{ mt: 1 }} size='large' variant='contained' onClick={login}>Login</Button>
                                </Box>
                            </Grid>
                            <Grid item lg={3} xs={12}></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid sx={{ mt: 1 }}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant='h5'>Register</Typography>
                        <Grid container>
                            <Grid item lg={3} xs={12}></Grid>
                            <Grid item lg={6} xs={12}>
                                <Box component='form'>
                                    <TextField label="Username" variant="standard" fullWidth required autoComplete='new-password' onChange={e => setRegisterUsername(e.target.value)} />
                                    <TextField sx={{ mt: 1 }} label="Password" variant="standard" fullWidth type='password' required autoComplete='new-password' onChange={e => setRegisterPassword(e.target.value)} />
                                    <TextField sx={{ mt: 1 }} label="Confirm Password" variant="standard" fullWidth type='password' required autoComplete='new-password' onChange={e => setRegisterConfirmPassword(e.target.value)} />
                                    <Button disabled={isWorking} sx={{ mt: 1 }} size='large' variant='contained' onClick={register}>Create account</Button>
                                </Box>
                            </Grid>
                            <Grid item lg={3} xs={12}></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
}

export default Login;
