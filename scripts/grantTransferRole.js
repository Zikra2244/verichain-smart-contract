const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const TREASURY_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const [deployer] = await hre.ethers.getSigners();
  console.log("Menggunakan akun Admin:", deployer.address);

  const AcademicNFT = await hre.ethers.getContractFactory("AcademicNFT");
  const contract = AcademicNFT.attach(CONTRACT_ADDRESS);

  const TRANSFER_ROLE = await contract.TRANSFER_ROLE();

  console.log(`Memberikan TRANSFER_ROLE ke Treasury (${TREASURY_ADDRESS})...`);

  const tx = await contract
    .connect(deployer)
    .grantRole(TRANSFER_ROLE, TREASURY_ADDRESS);
  await tx.wait();

  console.log("✅ SUKSES! Treasury sekarang punya izin TRANSFER_ROLE.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
