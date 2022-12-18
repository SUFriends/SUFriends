import * as React from 'react';
import { Card, Avatar, Chip, Typography, Stack } from '@mui/material';
import Layout from '../components/layouts/layout'
import { lightGreen } from '@mui/material/colors';



function Proposals(props) {
  return (
    <Layout>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar sx={{ bgcolor: lightGreen[300] }}> </Avatar>
          <Typography variant='h6'>should we implement this?</Typography>
          <Chip label="In progress" size='small' color="warning"></Chip>
          <Typography variant='caption'> ID: {"810ef9...8ac3"}</Typography>
        </Stack>
      </Card>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar sx={{ bgcolor: lightGreen[300] }}> </Avatar>
          <Typography variant='h6'>should we implement this?</Typography>
          <Chip label="Accepted" size='small' color="success"></Chip>
          <Typography variant='caption'> ID: {"810ef9...8ac3"}</Typography>
        </Stack>
      </Card>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar sx={{ bgcolor: lightGreen[300] }}> </Avatar>
          <Typography variant='h6'>should we implement this?</Typography>
          <Chip label="Denied" size='small' color="error"></Chip>
          <Typography variant='caption'> ID: {"810ef9...8ac3"}</Typography>
        </Stack>
      </Card>
    </Layout >
  );
}

export default Proposals;
