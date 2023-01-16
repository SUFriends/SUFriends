var SUFriendVote = artifacts.require("SUFriendVote");
var SUFriendGovernor = artifacts.require("SUFriendGovernor");
var TimeLock = artifacts.require("TimeLock");
var Treasury = artifacts.require("Treasury");

// Do not re-deploy 
module.exports = async (deployer, network, accounts) => {
    
    // vote
    const instance_vote = await SUFriendVote.deployed();
    console.log("instance_vote:", instance_vote.name);

    // timelock
    const instance_timelock = await TimeLock.deployed();
    console.log("instance_timelock:", instance_timelock.EXECUTOR_ROLE);

    // governor
    const instance_governor = await SUFriendVote.deployed();
    console.log("instance_governor:", instance_governor);

    // proposals
    

    // execute
    
}   