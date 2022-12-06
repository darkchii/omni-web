import { Button, Card, Container, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';

function Team() {
    const members = [
        {
            group: "Leaders",
            color: "#244b8fcc",
            members: [
                {
                    country: "NL",
                    name: "lecc",
                    role: "Founder / Developer"
                },
            ]
        },
        {
            group: "Managers",
            color: "#368f24cc",
            members: [

            ]
        },
        {
            group: "Members",
            color: "#ff4433cc",
            members: [

            ]
        },
        {
            group: "Trials",
            color: "#8f2e24cc",
            members: [

            ]
        }
    ]

    return (
        <>
            <Container>
                <TableContainer>
                    <Table size="small" sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none"}}}>
                        <TableHead>
                            <TableRow>
                                <TableCell><PublicIcon /></TableCell>
                                <TableCell><AccountCircleIcon /></TableCell>
                                <TableCell><WorkIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                members.map((group, index) => {
                                    return (
                                        <>
                                            <TableRow component={Paper} sx={{backgroundColor: group.color}}>
                                                <TableCell colSpan={3}>
                                                    <Typography variant="h6">{group.group}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            {
                                                group.members.map((member, index) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{member.country}</TableCell>
                                                            <TableCell>{member.name}</TableCell>
                                                            <TableCell>{member.role}</TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                        </>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default Team;
