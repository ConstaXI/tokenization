const chai = require("./setupChai.js")

const BN = web3.utils.BN

const Token = artifacts.require("Token.sol")
const TokenSale = artifacts.require("TokenSale.sol")

const expect = chai.expect

require("dotenv").config({ path: "../.env" })

contract("TokenSale Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts

    it('should not have any tokens in my deployerAccount', async () => {
        const instance = await Token.deployed();

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the TokenSale Smart Contract by default", async() => {
        const instance = await Token.deployed();

        const balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);

        const totalSupply = await instance.totalSupply();

        expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    })

    it("should be possible to buy tokens", async () => {
        const tokenInstance = await Token.deployed();

        const tokenSaleInstance = await TokenSale.deployed();

        const kycInstance = await KycContract.deployed();

        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});

        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;

        balanceBefore = balanceBefore.add(new BN(1));

        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    })
})