import * as React from "react";
import { Button, Grid } from "@mui/material";
import Layout from "../components/layouts/layout";
import ProposalCard from "../components/ProposalCard";

function Proposals(props) {
  return (
    <Layout>
      <Grid container justifyContent="flex-end">
        <Button variant="outlined" disableElevation>
          Create new proposal
        </Button>
      </Grid>
      <ProposalCard
        title="should we implement this"
        id=" c69c2c...8b77"
        status="In progress"
      ></ProposalCard>
      <ProposalCard
        title="test test test test test"
        id=" c69c2c...8b77"
        status="Accepted"
      ></ProposalCard>
      <ProposalCard
        title="hello hello hello hello hello"
        id=" c69c2c...8b77"
        status="Denied"
      ></ProposalCard>
    </Layout>
  );
}

export default Proposals;
