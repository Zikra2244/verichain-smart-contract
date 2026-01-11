const hre = require("hardhat");

async function main() {
  const [deployer, minter, treasury] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const AcademicNFT = await hre.ethers.getContractFactory("AcademicNFT");

  const academicNFT = await AcademicNFT.deploy(
    deployer.address,
    minter.address,
    treasury.address
  );

  await academicNFT.waitForDeployment();

  const contractAddress = await academicNFT.getAddress();

  console.log("----------------------------------------------------");
  console.log("✅ AcademicNFT deployed to:", contractAddress);
  console.log("👮 Admin (Zikra)    :", deployer.address);
  console.log("🏭 Minter (Ragil)   :", minter.address);
  console.log("🏦 Treasury (Ragil) :", treasury.address);
  console.log("----------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
