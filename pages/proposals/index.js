import * as React from "react";
import { Button, Grid } from "@mui/material";
import Layout from "../../components/layouts/layout";
import ProposalCard from "../../components/ProposalCard";

function Proposals(props) {
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button variant="outlined" disableElevation>
          Create new proposal
        </Button>
      </Grid>
      <ProposalCard
        title="should we implement this"
        id="c69c2c...8b77"
        status="In progress"
        yesVotes={50}
        noVotes={50}
        numOfDifferentAddresses={10}
      />
      <ProposalCard
        title="test test test test test"
        id="c69c2c...8b77"
        status="Accepted"
        yesVotes={80}
        noVotes={20}
        numOfDifferentAddresses={10}
      />
      <ProposalCard
        title="hello hello hello hello hello"
        id="c69c2c...8b77"
        status="Denied"
        yesVotes={30}
        noVotes={70}
        numOfDifferentAddresses={10}
      />
    </>
  );
}

export default Proposals;
