var SUFriendVote = artifacts.require("SUFriendVote");
var SUFriendGovernor = artifacts.require("SUFriendGovernor");
var TimeLock = artifacts.require("TimeLock");
var Treasury = artifacts.require("Treasury");

module.exports = async (deployer, network, accounts) => {

    // vote
    await deployer.deploy(SUFriendVote);
    const instance_vote = await SUFriendVote.deployed();
    //console.log(instance_vote);

    // timelock
    const [proposer, executer, admin] = accounts;
    min_delay = 1;
    await deployer.deploy(TimeLock, min_delay, [proposer], [executer], admin);
    const instance_timelock = await TimeLock.deployed();

    // accounts
    console.log("proposer:", proposer);
    console.log("executer:", executer);
    console.log("admin:", admin);

    // governor
    await deployer.deploy(SUFriendGovernor, instance_vote.address, instance_timelock.address);
    const instance_governor = await SUFriendGovernor.deployed();

    // treasury (owner = timelock)
    const funds = web3.utils.toWei('1', 'ether');
    await deployer.deploy(Treasury, executer, {value: funds, from: executer}); // executer acc deploys treasury contract
    const instance_treasury = await Treasury.deployed();

    // transfer ownership of treasury (executer -> timelock)
    // console.log("owner of treasury:", instance_treasury.owner);
    await instance_treasury.transferOwnership(instance_timelock.address, { from: executer }) // transfer ownership to timelock


    // scripts
    console.log("network:", network);
    console.log("accounts:", accounts);
}   