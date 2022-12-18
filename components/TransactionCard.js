import { Chip, Typography, Card, Box, Grid } from "@mui/material";
import { red } from "@mui/material/colors";

function getChipColor(actionType) {
  switch (actionType) {
    case "Sent to":
      return "error";
    case "In progress":
      return "warning";
    case "Received from":
      return "success";
  }
}

export default function TransactionCard({ amount, date, actionType, id }) {
  return (
    <Card sx={{ px: 4, py: 3, my: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography>{amount} ETH</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{date}</Typography>
        </Grid>
        <Grid item container spacing={2} xs={7}>
          <Grid container item xs={4} justifyContent="flex-end">
            <Chip
              label={actionType}
              color={getChipColor(actionType)}
              size="small"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography>{id}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
