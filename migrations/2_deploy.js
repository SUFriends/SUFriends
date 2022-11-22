// migrations/2_deploy.js
const Box = artifacts.require('Box');
const GovernanceToken = artifacts.require('GovernanceToken');
const GovernerContract = artifacts.require('GovernerContract');
const TimeLock = artifacts.require('TimeLock');

const MIN_DELAY = 3600;
const VOTING_PERIOD = 5;
const VOTING_DELAY = 1;
const QUORUM_PERCENTAGE = 70;

module.exports = async function (deployer) {
  await deployer.deploy(Box);
  await deployer.deploy(GovernanceToken);

  // deployment of governerContract and TimeLock
  // they expect constructor parameters
  TimeLock.PROPOSER_ROLE();

  await deployer.deploy(TimeLock, MIN_DELAY, [], [], "0x1Fa9fEC46d747C46fD50FFBe715066AD4604CBE7");

  await deployer.deploy(GovernerContract, 
    GovernanceToken.address, 
    TimeLock.address, 
    VOTING_DELAY, 
    VOTING_PERIOD,
    QUORUM_PERCENTAGE
  );

  
};