const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const BN = web3.utils.BN
const chaiBN = require("chai-bn")(BN)

chai.use(chaiBN)

const Token = artifacts.require("Token.sol")

chai.use(chaiAsPromised)

const expect = chai.expect

contract("Token Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts
    
    it("all tokens sould be in my account", async () => {
        const instance = await Token.deployed()

        const totalSupply = await instance.totalSupply()

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it("is not possible to send more tokens than available in total", async () => {
        const instance = await Token.deployed()

        const balanceOfDeployer = await instance.balanceOf(deployerAccount)

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;

        const instance = await Token.deployed()

        const totalSupply = await instance.totalSupply()

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)

        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))

        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
    })
})