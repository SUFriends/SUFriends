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
import { useRouter } from "next/router";

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
const titleSX = {
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
};

function goToDetails(event, id) {}

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
  const router = useRouter();

  return (
    <>
      <Card sx={{ p: 2, my: 2 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid container item xs={6} alignItems="center">
            <Avatar sx={{ bgcolor: lightGreen[300], mr: 2 }}> </Avatar>
            <Stack spacing={1}>
              <Typography
                sx={titleSX}
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/proposals/" + id);
                }}
                href={"/proposals/" + id}
                variant="h6"
              >
                {title}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={status}
                  color={getChipColor(status)}
                  size="small"
                />
                <Typography variant="caption" noWrap>
                  {" "}
                  ID: {id.slice(0, 4) + '...' + id.slice(38, 42)}
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
