// contracts/GovernanceToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// implementation of ERC20Votes as votes
contract GovernanceToken is ERC20Votes {

    // max supply
    uint256 public s_maxSupply = 10000000000000;

    // constructor: initializes once contract is deployed 
    constructor() 
    ERC20("SUVote", "SUV")
    ERC20Permit("SUVote")
    {
        _mint(msg.sender, s_maxSupply);
    }

    // functions below are overrides required by solidity
    function get() public view returns (uint256){
        return s_maxSupply;
    }


}