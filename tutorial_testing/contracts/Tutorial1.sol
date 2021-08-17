// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tutorial1 {
    // Constructor
    // Set the total number of tokens
    // Read the total number of tokens

    string public symbol="TUT1";
    string public name="Tutorial1";
    string public standard="Tutorial1 Token v1.0";

    uint256 public totalSupply;

    mapping(address =>uint256) public balanceOf;


    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender]=_initialSupply;
        totalSupply = _initialSupply;
    }


}
