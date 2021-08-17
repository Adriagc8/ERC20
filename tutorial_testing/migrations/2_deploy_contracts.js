const Tutorial1 = artifacts.require("./Tutorial1.sol");

module.exports = function (deployer) {
  deployer.deploy(Tutorial1, 1000000); // to pass arguments to the constructor of the contract, user ","
};
