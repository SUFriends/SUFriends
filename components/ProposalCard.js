import { Card, Avatar, Chip, Typography, Stack } from '@mui/material';
import { lightGreen } from '@mui/material/colors';




export default function ProposalCard({ title, status, id }) {
    let color, label;
    if (status == "inProgress") {
        color = "warning";
        label = "In progress"
    }
    else if (status == "accepted") {
        color = "success";
        label = "Accepted"
    }
    else if (status == "denied") {
        color = "error";
        label = "Denied"
    }

    return (
        <>
            <Card sx={{ p: 2, my: 2 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar sx={{ bgcolor: lightGreen[300] }}> </Avatar>
                    <Typography variant='h6'>{title}</Typography>
                    <Chip label={label}
                        color={color}
                        size='small' />
                    <Typography variant='caption'> ID: {id}</Typography>
                </Stack>
            </Card>
        </>
    );
} 