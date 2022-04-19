var token = artifacts.require("Token.sol");

module.exports = async function(deployer) {
  await deployer.deploy(token, 1000000);
};