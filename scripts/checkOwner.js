const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const AcademicNFT = await hre.ethers.getContractFactory("AcademicNFT");
  const contract = AcademicNFT.attach(CONTRACT_ADDRESS);

  try {
    const owner = await contract.ownerOf(0);
    console.log(`Owner of Token 0 is: ${owner}`);

    // Check against Treasury
    const TREASURY = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    if (owner === TREASURY) {
      console.log("✅ Treasury IS the owner.");
    } else {
      console.log("❌ Treasury is NOT the owner. Minting target was wrong.");
    }
  } catch (error) {
    console.log("❌ Token 0 does not exist.");
  }
}

main().catch(console.error);
