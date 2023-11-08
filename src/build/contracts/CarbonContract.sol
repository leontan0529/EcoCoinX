// CarbonContract.sol
pragma solidity ^0.8.0;

contract CarbonContract {
    string public name = "Carbon Contract";
    string public symbol = "CCT";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }
}
