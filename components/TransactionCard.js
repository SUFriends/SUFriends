import { Chip, Typography, Card, Box, Grid } from "@mui/material";
import { red } from "@mui/material/colors";

export default function TransactionCard({ amount, date, actionType, id }) {
  return (
    <Card sx={{ p: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography>{amount}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{date}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid container item xs={4} justifyContent="flex-end">
              <Chip
                label={actionType}
                color={actionType == "Sent to" ? "error" : "success"}
                size="small"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography>{id}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
