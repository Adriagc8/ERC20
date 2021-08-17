var ERC20_Example = artifacts.require('./ERC20_Example.sol');

contract('ERC20_Example', (accounts) => {
    //since we pass accounts whe have available all the accounts from ganache
    let tokenInstance;

    it('initializes the contract with the correct values', function () {
        return ERC20_Example.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function (name) {
            assert.equal(name, 'ERC20 Example', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function (symbol) {
            assert.equal(symbol, 'ERC20E', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function (standard) {
            assert.equal(standard, 'ERC20E Token v1.0', 'has the correct standard');
        });
    })

    it('allocates the initial supply upon deployement', () => {
        //The it(...) function defines a test case (aka a "spec").
        return ERC20_Example.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totatlSupply) => {
            assert.equal(totatlSupply.toNumber(), 1000000, 'sets the total supply to 100.000');
            //assert.equal is used to compare two values
            return tokenInstance.balanceOf(accounts[0]);
        }).then((adminBalance) => {
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supplye to the admin account');
        });
    });

    // it('transfers token ownership', () => {
    //     return Tutorial1.deployed().then((instance) => {
    //         tokenInstance = instance;
    //         // Test `require` statement first by transferring something larger than the sender's balance
    //         return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
    //     }).then(assert.fail).catch( (error)=> {
    //         assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    //         //if there isn't enough tokens to transfer will we have a revert as a response message
    //         return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });

    //     })
    // })
})