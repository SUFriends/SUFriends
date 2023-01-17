var SUFriendVote = artifacts.require("SUFriendVote");
var SUFriendGovernor = artifacts.require("SUFriendGovernor");
var TimeLock = artifacts.require("TimeLock");
var Treasury = artifacts.require("Treasury");

module.exports = async (deployer, network, accounts) => {

    // accounts
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = accounts; // await web3.eth.getAccounts()

    // vote - executor gets lots of votes
    await deployer.deploy(SUFriendVote);
    const instance_vote = await SUFriendVote.deployed();

    // give tokens to voters
    console.log("giving 5 votes to each voter:")
    const amount = web3.utils.toWei('5', 'ether')
    await instance_vote.transfer(proposer, amount, { from: executor })
    await instance_vote.transfer(voter1, amount, { from: executor })
    await instance_vote.transfer(voter2, amount, { from: executor })
    await instance_vote.transfer(voter3, amount, { from: executor })
    await instance_vote.transfer(voter4, amount, { from: executor })
    await instance_vote.transfer(voter5, amount, { from: executor })

    // timelock
    min_delay = 0;
    await deployer.deploy(TimeLock, min_delay, [proposer], [executor], admin, {from: executor});
    const instance_timelock = await TimeLock.deployed();

    // governor
    await deployer.deploy(SUFriendGovernor, instance_vote.address, instance_timelock.address, {from: executor});
    const instance_governor = await SUFriendGovernor.deployed();

    // treasury (owner = timelock)
    const funds = web3.utils.toWei('5', 'ether');
    await deployer.deploy(Treasury, {value: funds, from: executor}); // executor acc deploys treasury contract
    const instance_treasury = await Treasury.deployed();

    // transfer ownership of treasury (executor -> timelock)
    console.log("transfering ownership of treasury: executor -> timelock");
    await instance_treasury.transferOwnership(instance_timelock.address, { from: executor }); // transfer ownership to timelock
    console.log("owner of treasury:", await instance_treasury.owner());
    console.log("check: timelock address:", await instance_timelock.address, "\n");

    // grant roles
    const proposerRole = await instance_timelock.PROPOSER_ROLE()
    const executorRole = await instance_timelock.EXECUTOR_ROLE()

    // governor = owner + proposer + executor | admin is used for granting roles
    console.log("granting roles to governor:")
    await instance_timelock.grantRole(proposerRole, instance_governor.address, { from: admin })
    await instance_timelock.grantRole(executorRole, instance_governor.address, { from: admin })

}   