const chai = require("./setupChai.js")

const BN = web3.utils.BN

const Token = artifacts.require("Token.sol")
const TokenSale = artifacts.require("TokenSale.sol")

const expect = chai.expect

require("dotenv").config({ path: "../.env" })

contract("TokenSale Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts

    it("Should not have any tokens in my deployerAccount", async () => {
        const instance = await Token.deployed()

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0))
    })
})