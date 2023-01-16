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

    // check if funds released
    var isReleased = await instance_treasury.isReleased();
    console.log("Funds released?", isReleased); // false

    // check treasury balance
    var funds = await web3.eth.getBalance(instance_treasury.address);
    console.log(`Funds inside of treasury: ${web3.utils.fromWei(funds.toString(), 'ether')} ETH\n`);

    // check proposer
    const proposerRole = await instance_timelock.PROPOSER_ROLE()
    console.log("is proposer proposer:", await instance_timelock.hasRole(proposerRole, proposer)); // true

    // create release funds proposal
    const payee_address = voter1;
    const paying_amount = web3.utils.toWei('1', 'ether');
    const encodedFunction = await instance_treasury.contract.methods.releaseFunds([payee_address], [paying_amount]).encodeABI();
    const description = "Release Funds from Treasury";
    const tx = await instance_governor.propose([instance_treasury.address], [0], [encodedFunction], description, { from: proposer });
    console.log("tx ok");
    const id = tx.logs[0].args.proposalId
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

    const quorum = await governance.quorum(blockNumber - 1)
    console.log(`Number of votes required to pass: ${web3.utils.fromWei(quorum.toString(), 'ether')}\n`)

    // start casting votes
    console.log(`Casting votes...\n`)

    // 0 = Against, 1 = For, 2 = Abstain
    var vote;
    vote = await governance.castVote(id, 1, { from: voter1 })
    vote = await governance.castVote(id, 1, { from: voter2 })
    vote = await governance.castVote(id, 1, { from: voter3 })
    vote = await governance.castVote(id, 0, { from: voter4 })
    vote = await governance.castVote(id, 2, { from: voter5 })


    // execute


    // callback - bu ne ?
    callback();

}   