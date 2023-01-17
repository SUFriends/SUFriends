// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;

    constructor() payable {
        totalFunds = msg.value;
    }

    function releaseFunds(address payee, uint256 amount) public onlyOwner {
        totalFunds -= amount;
        payable(payee).transfer(amount);
    }

    event Received(address, uint);
    receive() external payable {
        totalFunds += msg.value;
        emit Received(msg.sender, msg.value);
    }
}