const ERC20_Example = artifacts.require("./ERC20_Example.sol");

module.exports = function (deployer) {
  deployer.deploy(ERC20_Example, 1000000); // to pass arguments to the constructor of the contract, user ","
};
