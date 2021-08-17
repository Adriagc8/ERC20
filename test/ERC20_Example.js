var ERC20_Example = artifacts.require('./ERC20_Example.sol');

contract('ERC20_Example', (accounts) => {
    //since we pass accounts whe have available all the accounts from ganache
    let tokenInstance;

    //CHECK THE INICIALITZATION OF THE CONTRACT
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

    //CHECK THE INITIAL SUPPLY OF THE CONTRACT
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

    it('transfers tokens ', () => {
        return ERC20_Example.deployed().then((instance) => {
            tokenInstance = instance;
            // Test `require` statement first by transferring something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 9000000);
            //transfer.call doesn't create a transaction
        }).then(assert.fail).catch((error) => {
            //console.log("ERROR",error.message);
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            //if there isn't enough tokens to transfer will we have a revert as a response message, testing the require statement
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
            //inspect the returned value of the function transfer
        }).then(function (success) {
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then((balance) => {
            console.log('\t Balance of ' + accounts[1] + '-receiver: ', balance.toNumber());
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((balance) => {
            console.log('\t Balance of ' + accounts[0] + '-sender: ', balance.toNumber());
            assert.equal(balance.toNumber(), 750000, 'deducys the amount from the sending account');
        });
    });


})