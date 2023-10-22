// Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
// Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

// Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
// Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
//npx hardhat run scripts/deployGamblingLocalHost.js --network localhost

const ethers = require('ethers');
require('dotenv').config();

async function main() {

//   const url = process.env.GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("Gambling2");

  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

//   let privateKey = process.env.PRIVATE_KEY;
  let privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let gambling = await factory.deploy('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');

  console.log("Gambling address:", gambling.address);

  await gambling.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});