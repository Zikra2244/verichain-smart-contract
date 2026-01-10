const hre = require("hardhat");

async function main() {
  // 1. Ambil akun-akun simulasi dari Hardhat
  // deployer = Akun Zikra (Admin)
  // minter = Akun simulasi Backend Ragil (untuk issue)
  // treasury = Akun simulasi Backend Ragil (untuk simpan aset)
  const [deployer, minter, treasury] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // 2. Ambil pabrik kontrak (Contract Factory)
  const AcademicNFT = await hre.ethers.getContractFactory("AcademicNFT");

  // 3. Deploy kontrak
  // Perhatikan urutan argumen constructor: (defaultAdmin, minter, treasury)
  const academicNFT = await AcademicNFT.deploy(
    deployer.address,
    minter.address,
    treasury.address
  );

  // Tunggu sampai deployment selesai
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
