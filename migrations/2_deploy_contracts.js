const ERC20_Example = artifacts.require("./ERC20-Example.sol");

module.exports = function (deployer) {
  deployer.deploy(ERC20_Example);
};
