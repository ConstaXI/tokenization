const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const BN = web3.utils.BN
const chaiBN = require("chai-bn")(BN)

chai.use(chaiBN)

const Token = artifacts.require("Token.sol")

chai.use(chaiAsPromised)

const expect = chai.expect

contract("Token Test", async (accounts) => {
    it("all tokens sould be in my account", async () => {
        let instance = await Token.deployed()

        let totalSupply = await instance.totalSupply()

        expect(await instance.balanceOf(accounts[0])).to.eventually.be.bignumber.equal(totalSupply)
    })
})