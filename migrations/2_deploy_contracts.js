const token = artifacts.require("Token.sol")
const tokenSale = artifacts.require("TokenSale.sol")

require("dotenv").config({ path: "../.env" })

module.exports = async function(deployer) {
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(token, process.env.INITIAL_TOKENS || 1000000)
  await deployer.deploy(tokenSale, 1, addresses[0], token.address)

  const instance = await token.deployed()

  await instance.transfer(tokenSale.address, process.env.INITIAL_TOKENS || 1000000)
}