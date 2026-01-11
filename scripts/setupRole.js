const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Cek .env Anda
  const [deployer] = await hre.ethers.getSigners();

  const Credential = await hre.ethers.getContractAt(
    "AcademicNFT",
    contractAddress
  );

  const MINTER_ROLE = await Credential.MINTER_ROLE();
  console.log("Memberikan role MINTER ke:", deployer.address);

  const tx = await Credential.grantRole(MINTER_ROLE, deployer.address);
  await tx.wait();

  console.log("Sukses!");
}

main().catch(console.error);
