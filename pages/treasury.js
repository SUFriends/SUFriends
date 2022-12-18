import * as React from "react";
import { Typography } from "@mui/material";
import Layout from "../components/layouts/layout";
import MemberCard from "../components/MemberCard";
import TransactionCard from "../components/TransactionCard";

function Treasury(props) {
  return (
    <Layout>
      <Typography variant="h6">Total Balance</Typography>
      <Typography variant="h4">{"0.2"} ETH</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Owners
      </Typography>
      <MemberCard
        id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"
        proposalsVoted="1"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Transfers
      </Typography>
      <TransactionCard
        amount="100"
        date="Thu, Dec 15, 2022"
        actionType="Received from"
        id="0x6d21266dfcf5541bee9f67c4837aaa72b3bf9303"
      />
      <TransactionCard
        amount="100"
        date="Thu, Dec 15, 2022"
        actionType="Sent to"
        id="0x6d21266dfcf5541bee9f67c4837aaa72b3bf9303"
      />
    </Layout>
  );
}

export default Treasury;
