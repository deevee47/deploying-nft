require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox"); // Correct package for ethers v6

const { API_URL, PRIVATE_KEY } = process.env;

if (!API_URL || !PRIVATE_KEY) {
  throw new Error("Missing API_URL or PRIVATE_KEY in .env file");
}

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [
        PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`,
      ],
    },
  },
};
