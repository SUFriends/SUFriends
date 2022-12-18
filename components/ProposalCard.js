import { Card, Avatar, Chip, Typography, Stack } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

function getChipColor(status) {
  switch (status) {
    case "Denied":
      return "error";
    case "In progress":
      return "warning";
    case "Accepted":
      return "success";
  }
}

export default function ProposalCard({ title, status, id }) {
  return (
    <>
      <Card sx={{ p: 2, my: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar sx={{ bgcolor: lightGreen[300] }}> </Avatar>
          <Typography variant="h6">{title}</Typography>
          <Chip label={status} color={getChipColor(status)} size="small" />
          <Typography variant="caption"> ID: {id}</Typography>
        </Stack>
      </Card>
    </>
  );
}
