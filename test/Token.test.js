const Token = artifacts.require("Token.sol")

const chai = require("./setupChai.js")

const BN = web3.utils.BN

const expect = chai.expect

contract("Token Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts

    let token

    beforeEach(async () => {
        token = await Token.new(process.env.INITIAL_TOKENS || 1000000)
    })
    
    it("all tokens sould be in my account", async () => {
        const instance = token

        const totalSupply = await instance.totalSupply()

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it("is not possible to send more tokens than available in total", async () => {
        const instance = token

        const balanceOfDeployer = await instance.balanceOf(deployerAccount)

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;

        const instance = token

        const totalSupply = await instance.totalSupply()

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)

        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))

        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
    })
})