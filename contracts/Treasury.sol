pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;
    address[] public users;

    constructor() payable {
        totalFunds = msg.value;
    }

    function getUsers() public view returns (address[] memory) {
        return users;
    }

    event Released(address, uint256);
    function releaseFunds(address payee, uint256 amount) public onlyOwner {
        totalFunds -= amount;
        payable(payee).transfer(amount);
        emit Released(payee, amount);
    }

    event Received(address, uint);
    receive() external payable {
        totalFunds += msg.value;
        users.push(msg.sender);
        emit Received(msg.sender, msg.value);
    }
}