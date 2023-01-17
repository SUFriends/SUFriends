import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Modal,
  Box,
  TextField,
  Tab,
  Tabs,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import ProposalCard from "../../components/ProposalCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "../../components/mui-rte";
import {ethers } from "ethers";
import addresses from "../../utils/constants"
import GovernorContract from "../../build/contracts/SUFriendGovernor.json"
import TreasuryContract from "../../build/contracts/Treasury.json"



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

export default function Proposals(props) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);


  const [proposalCards, setProposalCards] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  async function handleSave(value){
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum) 

    const treasuryContract = new ethers.Contract(addresses.TREASURY_ADDRESS, TreasuryContract.abi, provider);

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const walletAddress = accounts[0]    // first account in MetaMask
    const signer = provider.getSigner(walletAddress)

    const governorContract = new ethers.Contract(addresses.GOV_ADDRESS, GovernorContract.abi, signer);

    console.log({governorContract});
    console.log([ethers.utils.getAddress(receiver), amount]);

    // create tx
    // TODO
    const receiver_addr = ethers.utils.getAddress(receiver);
    const amount_int = ethers.utils.parseEther(amount);
    const transferCalldata = treasuryContract.interface.encodeFunctionData("releaseFunds", [receiver_addr, amount_int]);
    const description = "some description";

    console.log(transferCalldata);
    // propose releaseFunds
    const tx = await governorContract.propose(
      [treasuryContract.address],
      [0],
      [transferCalldata],
      description
    )
    
    
    // take proposal data 
    const proposer = await provider.getSigner().getAddress();
    const body = {
      title,
      receiver,
      description: value,
      proposer,
    };

    fetch("/api/proposal", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status == "200") {
          setSnackbarState(true);
        } else {
          setSnackbarState(false);
        }
      })
      .catch((e) => {
        setSnackbarState(false);
      });

    setSnackbarOpen(true);
    setModalOpen(false);
  }

  async function getAllProposals(){
    fetch("/api/proposal", {method: "GET"})
      .then( (response) => {
        response.json().then( (e) => {
          console.log(e.data); //e.data
          setProposalCards(e.data);
          console.log(proposalCards)

        });
      })
      .catch((e) => {
        console.log(e);
      });
  }


  useEffect(() => {
    getAllProposals();
  }, []);
  

  let content = "";
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarState
            ? "Proposal successfully created!"
            : "An error occured. Proposal could not be created!"}
        </Alert>
      </Snackbar>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
            <TextField onChange={(e) => {setReceiver(e.target.value)}} label="Receiver" variant="outlined" />
            <TextField onChange={(e) => {setAmount(e.target.value)}} type="number" label="Amount (ETH)" variant="outlined" />
            <TextField onChange={(e) => {setTitle(e.target.value)}} label="Title" variant="outlined" />

            <Tabs value={0}>
              <Tab label="Description" />
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
        <Button onClick={handleModalOpen} variant="outlined" disableElevation>
          Create new proposal
        </Button>
      </Grid>
      

      <div>
        {
          proposalCards.map((proposal) => {
            return (
              <ProposalCard
                title= {proposal.title}
                id= {proposal.descriptionHash}
                status= "Denied"
                yesVotes={30}
                noVotes={70}
                numOfDifferentAddresses={10}
              /> 
            );
          })
        }   
      </div>  
      
    </>
  );
}
