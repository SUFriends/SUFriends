// migrations/2_deploy.js
const Box = artifacts.require('Box');
const GovernanceToken = artifacts.require('GovernanceToken');

module.exports = async function (deployer) {
  await deployer.deploy(Box);
  await deployer.deploy(GovernanceToken);
};