// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Treasury {
    mapping(address => bool) isGoverner;

    event Transfer(address target, uint256 amount);
    event Receive(address target, uint256 amount);
    event NewGoverner(address newGoverner);
    event RemoveGoverner(address removeGoverner);

    constructor(address governer) {
        isGoverner[governer] = true;
    }

    receive() external payable {
        emit Receive(msg.sender, msg.value);
    }

    function transfer(uint256 amount, address payable target) public {
        require(isGoverner[msg.sender]);
        target.transfer(amount);
        emit Transfer(target, amount);
    }

    function addGoverner(address newGoverner) public {
        require(isGoverner[msg.sender]);
        isGoverner[newGoverner] = true;
        emit NewGoverner(newGoverner);
    }

    function removeGoverner(address gov) public {
        require(isGoverner[msg.sender]);
        isGoverner[gov] = false;
        emit RemoveGoverner(gov);
    }
}
