const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BulkMintTokenCon = await hre.ethers.getContractFactory("BulkMint");
  const bulkMintTokenCon = await BulkMintTokenCon.deploy();

  console.log("BulkMint Token contract address:", bulkMintTokenCon.address);

  const MultiSendTokenCon = await hre.ethers.getContractFactory("MultiSend");
  const multiSendTokenCon = await MultiSendTokenCon.deploy();

  console.log("MultiSend Token contract address:", multiSendTokenCon.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
