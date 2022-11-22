// scripts/index.js

module.exports = async function main (callback) {
    try {
        // Our code will go here

        // Retrieve accounts from the local node
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)

        // Set up a Truffle contract, representing our deployed Box instance 
        const Box = artifacts.require('Box');
        const box = await Box.deployed();

        // set box value to 42
        await box.store(42);

        // Call the retrieve() function of the deployed Box contract
        const value = await box.retrieve();
        console.log('Box value is', value.toString());

        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
};

