import * as React from "react";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import MemberCard from "../components/MemberCard";
import TransactionCard from "../components/TransactionCard";
import addresses from "../utils/constants"
import TreasuryContract from "../build/contracts/Treasury.json"

const ethers = require('ethers');

function Treasury(props) {
  const [balance, setBalance] = useState(0);

  function getTreasury() {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum) 
    const treasuryContract = new ethers.Contract(addresses.TREASURY_ADDRESS, TreasuryContract.abi, provider);

    provider.getBalance(addresses.TREASURY_ADDRESS).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance)
      setBalance(balanceInEth);
    })
  }

  useEffect(() => {
    getTreasury();
  }, []);

  return (
    <>
      <Typography variant="h6">Total Balance</Typography>
      <Typography variant="h4">{balance} ETH</Typography>
      <Typography variant="h6" sx={{ my: 4 }}>Owners</Typography>
      <MemberCard
        id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"
        proposalsVoted="1"
      />

      <Typography variant="h6" sx={{ my: 4 }}>
        Pending transactions
      </Typography>
      <TransactionCard
        amount="100"
        date="Thu, Dec 15, 2022"
        actionType="In progress"
        id="0x6d21266dfcf5541bee9f67c4837aaa72b3bf9303"
      />
      <TransactionCard
        amount="100"
        date="Thu, Dec 15, 2022"
        actionType="In progress"
        id="0x6d21266dfcf5541bee9f67c4837aaa72b3bf9303"
      />

      <Typography variant="h6" sx={{ mt: 4 }}>
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
    </>
  );
}

export default Treasury;
