// migrations/2_deploy.js
const Token = artifacts.require('SUFriendVote');
const Governor = artifacts.require('SUFriendGovernor');
const Treasury = artifacts.require('TreasuryOZ');
const TimeLock = artifacts.require('TimeLock');

module.exports = async function (deployer) {

    // Deploy Vote
    await deployer.deploy(Token);
    const token = await Token.deployed(); // token is the instance of the deployed contract

    // Get Accounts
    const [admin, executor, proposer, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    console.log('admin', admin)
    console.log('executor', executor)
    console.log('proposer', proposer)
    console.log('voter1', voter1)
    console.log('voter2', voter2)
    console.log('voter3', voter3)
    console.log('voter4', voter4)
    console.log('voter5', voter5)

    // Deploy TimeLock
    const minDelay = 1;
    await deployer.deploy(TimeLock, minDelay, [proposer], [executor], admin);
    const timelock = await TimeLock.deployed();

    console.log('timelock', timelock.address)

    /* -------- Works Until Here -------- */

    // Deploy Governor
    await deployer.deploy(Governor, token.address, timelock.address); // constructor gas limit exceeded
    const governor = await Governor.deployed();

    console.log('governor', governor.address)

    // Deploy Treasury
    //const governorAddress = await governor.address;
    //const treasury = deployer.deploy(Treasury, governorAddress);

}