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
      <ProposalCard title="test" id="testtt" status="inProgress"></ProposalCard>
      <ProposalCard title="test" id="testtt" status="accepted"></ProposalCard>
      <ProposalCard title="test" id="testtt" status="denied"></ProposalCard>
    </Layout>
  );
}

export default Proposals;
