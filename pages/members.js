import * as React from 'react';
import { Avatar, Typography, Card, Stack } from '@mui/material';
import Layout from '../components/layouts/layout'
import { red } from '@mui/material/colors';



function Members(props) {
  return (
    <Layout>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography>1</Typography>
            <Avatar sx={{ bgcolor: red[300] }}> </Avatar>
            <Typography> {"0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"}</Typography>
          </Stack>
          <Typography> Proposals voted: {"1"}</Typography>
        </Stack>
      </Card>
    </Layout>

  );
}

export default Members;
