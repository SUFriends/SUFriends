// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController{
    /*
    minDelay = how long wait before exec
    proposers = list of addresses that can propose
    executors = who can execute when a proposal passes
    */

    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin // dont know this one
    ) TimelockController(minDelay, proposers, executors, admin) {}

}