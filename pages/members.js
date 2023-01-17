import * as React from "react";
import { useState, useEffect } from "react";

import MemberCard from "../components/MemberCard";

import addresses from "../utils/constants"
import SUFriendVote from "../build/contracts/SUFriendVote.json"

const ethers = require('ethers');

function Members(props) {

  function getMembers() {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const VoteContract = new ethers.Contract(addresses.VOTE_ADDRESS, SUFriendVote.abi, provider);
    //TODO: getmembers
    VoteContract.totalSupply().then((res) => {
      console.log(res.toString());
    })
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <MemberCard
        id="0x57d39B2a3d9Ea14062856388BaF34a6AC17D05fa"
        proposalsVoted="1"
      />
    </>
  );
}

export default Members;
