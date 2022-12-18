import * as React from "react";
import { Typography } from "@mui/material";
import Layout from "../components/layouts/layout";
import MemberCard from "../components/MemberCard";

function Treasury(props) {
  return (
    <Layout>
      <Typography variant="h6">Total Balance</Typography>
      <Typography variant="h4">{"0.2"} ETH</Typography>
      <Typography variant="h6" sx={{mt: 2}}>Owners</Typography>
      <MemberCard
        id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"
        proposalsVoted="1"
      />
    </Layout>
  );
}

export default Treasury;
