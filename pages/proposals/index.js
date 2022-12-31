import { useState } from "react";
import { Button, Grid, Modal, Box, Typography } from "@mui/material";
import ProposalCard from "../../components/ProposalCard";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Proposals(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleOpen} variant="outlined" disableElevation>
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
