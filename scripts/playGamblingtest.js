const ethers = require('ethers');
const hre = require('hardhat')

const gameAddr = "0x1f4Db3899d52f8766C86AFeb69537E374381E5c6"
 let privateKey = process.env.PRIVATE_KEY;
// let privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const contractName = "Gambling";

async function main() {

    const url = process.env.GOERLI_URL;
    // const url = 'http://localhost:8545'
    const provider = new ethers.providers.JsonRpcProvider(url);
    let wallet = new ethers.Wallet(privateKey, provider);

    const balance = await wallet.getBalance();
    const etherBalance = ethers.utils.formatEther(balance);
    console.log(`Wallet Address: ${wallet.address}`);
    console.log(`Balance: ${etherBalance} ETH`);

    const amountToSend = ethers.utils.parseEther('.001'); // Sending 0.1 Ether

    async function sendEther() {
      try {
        // Create a transaction object
        const txx = {
          to: gameAddr,
          value: amountToSend,
          gasPrice: ethers.utils.parseUnits('200000', 'gwei'), // Increase the gas price

        };
    
        // Sign the transaction
        const txResponse = await wallet.sendTransaction(txx);
    
        // Wait for the transaction to be mined
        await txResponse.wait();
    
        console.log(`Transaction hash: ${txResponse.hash}`);
        console.log('Transaction sent successfully!');
      } catch (error) {
        console.error('Error sending Ether:', error);
      }
    }
    
       sendEther();






    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:
    // const gasLimit = 70000; 
    // const tx = await game.playGame(4, 9, '0x9A270d907094fE3aDF9D2dA89265E0405f6E2142');
    let testAcc = '0x9A270d907094fE3aDF9D2dA89265E0405f6E2142'
    const tx = await game.playGame (9,8, testAcc)
    //console.log(tx)
    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    //console.log(receipt.events);
    console.log("the default address is", await game.randomNumberGenerator())
    console.log(receipt.events);
    const contractBalance = await hre.ethers.provider.getBalance(game.address);

    const contractBalanceInEther = hre.ethers.utils.formatEther(contractBalance);

    console.log("the jackpot is:", contractBalanceInEther)
    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
