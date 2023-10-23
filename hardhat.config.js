require("@nomiclabs/hardhat-waffle");
//require("@nomicfoundation/hardhat-toolbox"); //modern way to do it // possibly only working with 0.8.17
//test
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "goerli", //or defaultNetwork: "localhost",
  networks: {
    hardhat: {}, //this line is only needed if launching on local networks 
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    optimism: {
      url: process.env.OPTIMISM_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    optimismGoerli: {
      url: process.env.OPTIMISM_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    metamask: {
      url: process.env.GOERLI_URL,
      accounts: []
    },
  }
};