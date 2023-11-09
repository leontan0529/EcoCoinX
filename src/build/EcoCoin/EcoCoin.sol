// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EcoCoin is ERC20 {
    constructor() ERC20("EcoCoin", "ECO") {
        _mint(msg.sender, 1000000000000000000000000); // Mint 1,000,000 ECO tokens to the contract creator
    }
}
