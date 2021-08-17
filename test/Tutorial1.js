var Tutorial1=artifacts.require('./Tutorial1.sol');

contract('Tutorial1',(accounts)=>{
    it('sets the total supply upon deployement',()=>{ 
        //The it(...) function defines a test case (aka a "spec").
    return Tutorial1.deployed().then((instance)=>{
        tokenInstance=instance;
        return tokenInstance.totalSupply();
    }).then((totatlSupply)=>{
        assert.equal(totatlSupply.toNumber(),1000000,'sets the total supply to 1000000');
    })
    })
})