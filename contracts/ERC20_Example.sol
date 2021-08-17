//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.16<0.9.0;

contract ERC20_Example{

    uint256 public totalSupply;
    string public name="ERC20 Example";
    string public symbol="ERC20E";
    string public standard="ERC20E Token v1.0";

    mapping(address =>uint256) public balanceOf;
    mapping(address => mapping(address=>uint256))public allowance;
    //function allowance(address _owner, address _spender) public view returns (uint256 remaining)
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender]=_initialSupply;
        totalSupply =_initialSupply;
    }

    modifier hasEnough(address _spender,uint256 _amount){
        require(balanceOf[_spender]>=_amount);
        _;
    }
    
    
    function transfer(address _to, uint256 _value) public payable hasEnough(msg.sender,_value) returns (bool success) {
        
       // require(balanceOf[msg.sender]>=_value);
       balanceOf[msg.sender]-=_value;
       balanceOf[_to]+=_value;
       
       emit Transfer(msg.sender, _to, _value);
       
       return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success){
        //set allowance
        allowance[msg.sender][_spender]=_value;
        //Aprove event
        emit Approval(msg.sender, _spender, _value);
        return true;
        
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public payable hasEnough(_from,_value) returns (bool success){
        //Require allowance is big enough 
        require(allowance[_from][msg.sender]>=_value);
        
        //Change the balance
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        
        //Update allowance
        allowance[_from][msg.sender]-=_value;
        //Transfer event
        emit Transfer(_from,_to, _value);
        return true;
    }
}