// scripts/index.js

module.exports = async function main (callback) {
    try {


        // Retrieve accounts from the local node
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)

        const Gov = artifacts.require('GovernanceToken');
        const gov = await Gov.deployed();

        // gov get func
        console.log((await gov.get()).toString());

        // Call the retrieve() function of the deployed Box contract
        const value = await box.retrieve();
        console.log('Box value is', value.toString());

        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
};

