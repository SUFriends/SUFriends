var SUFriendVote = artifacts.require("SUFriendVote");
var SUFriendGovernor = artifacts.require("SUFriendGovernor");
var TimeLock = artifacts.require("TimeLock");
var Treasury = artifacts.require("Treasury");

// Do not re-deploy 
module.exports = async (callback) => {

    // get accounts
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts();

    // get vote contract
    const instance_vote = await SUFriendVote.deployed();
    
    // delegate = turn tokens into votes
    const amount = web3.utils.toWei('5', 'ether');
    await instance_vote.delegate(proposer, { from: proposer });
    await instance_vote.delegate(voter1, { from: voter1 });
    await instance_vote.delegate(voter2, { from: voter2 });
    await instance_vote.delegate(voter3, { from: voter3 });
    await instance_vote.delegate(voter4, { from: voter4 });
    await instance_vote.delegate(voter5, { from: voter5 });
    console.log("5 voters, each have 5 votes!");

    // get governor contract
    const instance_governor = await SUFriendGovernor.deployed();

    // get timelock contract
    const instance_timelock = await TimeLock.deployed();

    // get treasury contract
    const instance_treasury = await Treasury.deployed();
    console.log("instance_treasury_owner:", await instance_treasury.owner());
    console.log("check if owner is timelock:", await instance_timelock.address);

    // check treasury balance
    var funds = await web3.eth.getBalance(instance_treasury.address);
    console.log(`Funds inside of treasury: ${web3.utils.fromWei(funds.toString(), 'ether')} ETH\n`);

    // check proposer
    const proposerRole = await instance_timelock.PROPOSER_ROLE()
    console.log("is proposer proposer:", await instance_timelock.hasRole(proposerRole, proposer)); // true

    // create release funds proposal
    const payee_address = voter1;
    const paying_amount = web3.utils.toWei('1', 'ether');
    
    const releaseFundsTx = await instance_treasury.contract.methods.releaseFunds(payee_address, paying_amount);
    //console.log("no error:", releaseFundsTx);

    const encodedFunction = await releaseFundsTx.encodeABI();
    //console.log("encodedFunction:", encodedFunction);

    const treasury_address = await instance_treasury.address;

    const proposer_votes = await instance_vote.getVotes(proposer);
    console.log("proposer votes:", await web3.utils.fromWei(proposer_votes));

    const description = "Release Funds from Treasury";

    const tx = await instance_governor.propose(
        [treasury_address], 
        [0], 
        [encodedFunction], 
        description, 
        { from: proposer }
    );
    console.log("tx receipt:", await tx.receipt);


    const id = await tx.logs[0].args.proposalId;
    console.log(`Created Proposal: ${id.toString()}\n`)

    // check proposal state
    var proposalState = await instance_governor.state.call(id);
    console.log(`Current state of proposal: ${proposalState.toString()} (Pending) \n`);

    const snapshot = await instance_governor.proposalSnapshot.call(id);
    console.log(`Proposal created on block ${snapshot.toString()}`);

    const deadline = await instance_governor.proposalDeadline.call(id);
    console.log(`Proposal deadline on block ${deadline.toString()}\n`);

    var blockNumber = await web3.eth.getBlockNumber();
    console.log(`Current blocknumber: ${blockNumber}\n`);

    const quorum = await instance_governor.quorum(blockNumber - 1)
    console.log(`Number of votes required to pass: ${web3.utils.fromWei(quorum.toString(), 'ether')}\n`)
    
    // all 5 
    /*
    console.log("votes1:",  web3.utils.fromWei(await instance_vote.getVotes(voter1)));
    console.log("votes2:",  web3.utils.fromWei(await instance_vote.getVotes(voter2)));
    console.log("votes3:",  web3.utils.fromWei(await instance_vote.getVotes(voter3)));
    console.log("votes4:",  web3.utils.fromWei( await instance_vote.getVotes(voter4)));
    console.log("votes5:",  web3.utils.fromWei(await instance_vote.getVotes(voter5)));
    */

    // start casting votes
    console.log(`Casting votes...\n`)

    // 0 = Against, 1 = For, 2 = Abstain
    var vote;
    try{
        vote = await instance_governor.castVote(id, 1, { from: voter1 })
        vote = await instance_governor.castVote(id, 1, { from: voter2 })
        vote = await instance_governor.castVote(id, 1, { from: voter3 })
        vote = await instance_governor.castVote(id, 0, { from: voter4 })
        vote = await instance_governor.castVote(id, 2, { from: voter5 })
    } catch(e){
        console.log(e);
    }

    console.log("votes are casted");

    // States: Pending, Active, Canceled, Defeated, Succeeded, Queued, Expired, Executed
    proposalState = await instance_governor.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Active) \n`)

    // NOTE: Transfer serves no purposes, it's just used to fast foward one block after the voting period ends
    const dummy = web3.utils.toWei('1', 'ether');
    await instance_vote.transfer(proposer, dummy, { from: executor })
    await instance_vote.transfer(proposer, dummy, { from: executor })

    // vote counts
    const { againstVotes, forVotes, abstainVotes } = await instance_governor.proposalVotes.call(id)
    console.log(`Votes For: ${web3.utils.fromWei(forVotes.toString(), 'ether')}`)
    console.log(`Votes Against: ${web3.utils.fromWei(againstVotes.toString(), 'ether')}`)
    console.log(`Votes Neutral: ${web3.utils.fromWei(abstainVotes.toString(), 'ether')}\n`)

    blockNumber = await web3.eth.getBlockNumber()
    console.log(`Current blocknumber: ${blockNumber}\n`)

    proposalState = await instance_governor.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Succeeded) \n`)

    // Queue 
    const hash = web3.utils.sha3("Release Funds from Treasury")
    await instance_governor.queue([treasury_address], [0], [encodedFunction], hash, { from: executor })

    proposalState = await instance_governor.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Queued) \n`)

    // Execute
    await instance_governor.execute([treasury_address], [0], [encodedFunction], hash, { from: executor })

    proposalState = await instance_governor.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Executed) \n`)

    isReleased = await instance_treasury.isReleased()
    console.log(`Funds released? ${isReleased}`)

    funds = await web3.eth.getBalance(treasury_address)
    console.log(`Funds inside of treasury: ${web3.utils.fromWei(funds.toString(), 'ether')} ETH\n`)


    // callback - bu ne ?
    callback();

}   