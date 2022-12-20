import { Avatar, Typography, Card, Stack } from "@mui/material";
import { red } from "@mui/material/colors";

export default function MemberCard({ id, proposalsVoted }) {
  return (
    <Card sx={{ p: 2, my: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography>1</Typography>
          <Avatar sx={{ bgcolor: green[300] }}> </Avatar> // changes red to green 
          <Typography>{id}</Typography>
        </Stack>
        <Typography> Proposals voted: {proposalsVoted}</Typography>
      </Stack>
    </Card>
  );
}
