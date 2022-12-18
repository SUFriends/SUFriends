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

function LinearProgressWithLabel({ color, ...props }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color={color}></Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
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

export default function ProposalCard({ title, status, id }) {
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
                Yes • 7.6M
              </Typography>
              <LinearProgress
                variant="determinate"
                color="success"
                value="20"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="success">
                No • 7.6M
              </Typography>
              <LinearProgress variant="determinate" color="error" value="20" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="success">
                Total 7.6M Votes
              </Typography>
              <Typography variant="subtitle2" color="success" noWrap>
                600 Addresses
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
