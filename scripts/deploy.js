const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with address:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy(deployer.address);

  await myNFT.waitForDeployment();
  console.log("Contract deployed to:", myNFT.target);

  if (!myNFT.target) {
    console.error("❌ Contract deployment failed!");
    return;
  }

  // Mint an NFT
  const recipient = "0x798d3eC31E574A0F2A27CC0e9611e6Ba511077BE"; // Replace with actual address
  const tokenURI =
    "ipfs://bafkreidepzmy3zgft4fktuwvfj7p3g7eiubinucuzqthrupcidinpcokpa";

  console.log("Minting NFT...");
  const tx = await myNFT.mintNFT(recipient, tokenURI);
  await tx.wait();

  // Fetch the latest token ID from the contract
  const tokenId = await myNFT.getLatestTokenId();
  console.log("✅ Minted NFT with Token ID:", tokenId.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
