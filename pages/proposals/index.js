import { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Box,
  TextField,
  Tab,
  Tabs,
  Stack,
} from "@mui/material";
import ProposalCard from "../../components/ProposalCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";

const myTheme = createTheme({
  components: {
    // @ts-ignore
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "80%",
        height: "200px",
        maxHeight: "500px",
      },
      editor: {
        height: "200px",
        maxHeight: "500px",
        overflow: "auto",
      },
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxHeight: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

async function handleSave(value) {
  try {
    const body = {
      description: value,
      proposer: "123921893213",
    };
    await fetch("/api/proposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
}
export default function Proposals(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let content = "";
  const sample = "<h1>Hello, {{name}}!</h1><p>this is test</p>";
  if (typeof document === "undefined") {
    // during server evaluation
  } else {
    const raw = {
      blocks: [
        {
          key: "fe0eb",
          text: "Hello, {{name}}!",
          type: "header-one",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "bnqjc",
          text: "this is test",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    content = JSON.stringify(raw);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
            <TextField label="Receiver" variant="outlined" />
            <TextField type="number" label="Amount (ETH)" variant="outlined" />

            <Tabs value={0}>
              <Tab label="Description">Description</Tab>
            </Tabs>
          </Stack>

          <ThemeProvider theme={myTheme}>
            <MUIRichTextEditor
              defaultValue={content}
              controls={[
                "title",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "highlight",
                "link",
                "media",
                "numberList",
                "bulletList",
                "quote",
                "code",
                "clear",
                "save",
              ]}
              onSave={(value) => handleSave(value)}
              label="Start typing..."
            />
          </ThemeProvider>
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
