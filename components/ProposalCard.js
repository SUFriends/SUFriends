import {
  Card,
  Avatar,
  Chip,
  Typography,
  Stack,
  LinearProgress,
  Box,
  Grid,
} from "@mui/material";
import { lightGreen } from "@mui/material/colors";

function getYesPercentage(yesVotes, totalVotes) {
  return (yesVotes / totalVotes) * 100;
}

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

export default function ProposalCard({
  title,
  status,
  id,
  yesVotes,
  noVotes,
  numOfDifferentAddresses,
}) {
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = getYesPercentage(yesVotes, totalVotes);
  const noPercentage = 100 - yesPercentage;
  console.log(yesPercentage)
  return (
    <>
      <Card sx={{ p: 2, my: 2 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid container item xs={6} alignItems="center">
            <Avatar sx={{ bgcolor: lightGreen[300], mr: 2 }}> </Avatar>
            <Stack spacing={1}>
              <Typography variant="h6">{title}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={status}
                  color={getChipColor(status)}
                  size="small"
                />
                <Typography variant="caption" noWrap>
                  {" "}
                  ID: {id}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid container item xs={6} spacing={3} justifyContent="flex-end">
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="success">
                Yes • {yesVotes}
              </Typography>
              <LinearProgress
                variant="determinate"
                color="success"
                value={yesPercentage}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="success">
                No • {noVotes}
              </Typography>
              <LinearProgress
                variant="determinate"
                color="error"
                value={noPercentage}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="success">
                Total {totalVotes} Votes
              </Typography>
              <Typography variant="subtitle2" color="success" noWrap>
                {numOfDifferentAddresses} Addresses
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
