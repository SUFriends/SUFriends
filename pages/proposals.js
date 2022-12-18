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
      <ProposalCard title="should we implement this" id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa" status="In progress"></ProposalCard>
      <ProposalCard title="test test test test test" id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa" status="Accepted"></ProposalCard>
      <ProposalCard title="hello hello hello hello hello" id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa" status="Denied"></ProposalCard>
    </Layout>
  );
}

export default Proposals;
