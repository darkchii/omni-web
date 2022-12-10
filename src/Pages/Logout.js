import { Alert, AlertTitle, Box, Button, Card, CardContent, CardHeader, Container, FormGroup, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import servers from "../servers.json";
import LockIcon from '@mui/icons-material/Lock';
import { LoginUser, LogoutUser, RegisterUser } from "../Utils/Network";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';

function Logout() {
    const showNotification = (title, message, severity) => {
        toast[severity](message, config.NOTIFICATIONS);
    };

    const logout = () => {
        (async () => {
            try{
                await LogoutUser();
                window.location.reload(false);
            }catch(e){
                showNotification('Error', e.message, 'error');
            }
        })();
    };

    useEffect(() => {
        (async () => {
            await logout();

        })();
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar />
        </>
    );
}

export default Logout;
