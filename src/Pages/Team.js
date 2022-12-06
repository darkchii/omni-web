import { Button, Card, Chip, Container, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import Flag from 'react-world-flags';

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
                }
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
        },
        {
            group: "Honorable",
            color: "#52048acc",
            members: [
                {
                    country: "DE",
                    name: "Paake",
                    role: "Founder"
                },
                {
                    country: "NL",
                    name: "Risque",
                    role: "Leader"
                },
                {
                    country: "HU",
                    name: "CHRS",
                    role: "Criminal"
                },
            ]
        }
    ]

    return (
        <>
            <Container>
                <TableContainer sx={{ borderRadius: '5px' }}>
                    <Table size="small" sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }}>
                        <TableBody>
                            {
                                members.map((group, index) => {
                                    return (
                                        <>
                                            <TableRow component={Paper} sx={{ backgroundColor: group.color }}>
                                                <TableCell colSpan={3}>
                                                    <Typography variant="h6">{group.group}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            {
                                                group.members.map((member, index) => {
                                                    return (
                                                        <TableRow sx={{ backgroundColor: '#ffffff88' }}>
                                                            <TableCell><Flag height="16" code={member.country} /></TableCell>
                                                            <TableCell>
                                                                <Typography sx={{ color: group.color }} display='inline'>{member.name}</Typography>
                                                                <Typography sx={{ color: 'primary.main' }} display='inline'>/05</Typography>
                                                            </TableCell>
                                                            <TableCell><Typography>{member.role}</Typography></TableCell>
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
