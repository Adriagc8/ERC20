var Tutorial1=artifacts.require('./Tutorial1.sol');

contract('Tutorial1',(accounts)=>{ 
    //since we pass accounts whe have available all the accounts from ganache
    let tokenInstance;

    it('initializes the contract with the correct values', function() {
        return Tutorial1.deployed().then(function(instance) {
          tokenInstance = instance;
          return tokenInstance.name();
        }).then(function(name) {
          assert.equal(name, 'Tutorial1', 'has the correct name');
          return tokenInstance.symbol();
        }).then(function(symbol) {
          assert.equal(symbol, 'TUT1', 'has the correct symbol');
          return tokenInstance.standard();
        }).then(function(standard) {
          assert.equal(standard, 'Tutorial1 Token v1.0', 'has the correct standard');
        });
      })
    
    it('allocates the initial supply upon deployement',()=>{ 
        //The it(...) function defines a test case (aka a "spec").
    return Tutorial1.deployed().then((instance)=>{
        tokenInstance=instance;
        return tokenInstance.totalSupply();
    }).then((totatlSupply)=>{
        assert.equal(totatlSupply.toNumber(),1000000,'sets the total supply to 100.000');
        //assert.equal is used to compare two values
        return tokenInstance.balanceOf(accounts[0]);
    }).then((adminBalance)=>{
        assert.equal(adminBalance.toNumber(),1000000, 'it allocates the initial supplye to the admin account');
    })
    })
})