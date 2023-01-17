const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy contracts", function () {
  let deployer, user, attacker;

  beforeEach(async function () {
    [deployer, user, attacker] = await ethers.getSigners();

    const TreasuryFactory = await ethers.getContractFactory("TreasuryOZ", deployer);
    this.TreasuryContract = await TreasuryFactory.deploy();

    await this.TreasuryContract.deposit({ value: ethers.utils.parseEther("100") });
    await this.TreasuryContract.connect(user).deposit({ value: ethers.utils.parseEther("50") });

    const AttackerFactory = await ethers.getContractFactory("Attacker", attacker);
    this.attackerContract = await AttackerFactory.deploy(this.TreasuryContract.address);
  });

  describe("Test deposit and withdraw of Bank contract", function () {
    it("Should accept deposits", async function () {
      const deployerBalance = await this.TreasuryContract.balanceOf(deployer.address);
      expect(deployerBalance).to.eq(ethers.utils.parseEther("100"));

      const userBalance = await this.TreasuryContract.balanceOf(user.address);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });

    it("Should accept withdrawals", async function () {
      await this.TreasuryContract.withdraw();

      const deployerBalance = await this.TreasuryContract.balanceOf(deployer.address);
      const userBalance = await this.TreasuryContract.balanceOf(user.address);

      expect(deployerBalance).to.eq(0);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });

    it("Perform Attack", async function () {
      console.log("");
      console.log("*** Before ***");
      console.log(`Treasury's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.TreasuryContract.address)).toString()}`);
      console.log(`Attacker's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

      await this.attackerContract.attack({ value: ethers.utils.parseEther("10") });

      console.log("");
      console.log("*** After ***");
      console.log(`Treasury's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.TreasuryContract.address)).toString()}`);
      console.log(`Attackers's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);
      console.log("");

      expect(await ethers.provider.getBalance(this.TreasuryContract.address)).to.eq(0);
    });
  });
});