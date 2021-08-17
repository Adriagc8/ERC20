const Tutorial1 = artifacts.require("./Tutorial1.sol");

module.exports = function (deployer) {
  deployer.deploy(Tutorial1);
};
