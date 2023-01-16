// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;

    constructor(address _payee) payable {
        totalFunds = msg.value;
    }

    function releaseFunds(address payee, uint amount) public onlyOwner {
        payable(payee).transfer(amount);
        totalFunds -= amount;
    }
}