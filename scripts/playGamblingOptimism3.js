// Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
// Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

// Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
// Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

// Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
// Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
//npx hardhat run scripts/deployGamblingLocalHost.js --network localhost
const ethers = require('ethers');
const hre = require('hardhat')

//npx hardhat run scripts/playGamblingLocalHost.js --network localhost


// const gameAddr = '0x21efEbfb563d155C7005B3607270f1fc127CAAec'//optimism
const gameAddr = '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C'
 let privateKey = process.env.PRIVATE_KEY;
 let demoUserKey = process.env.DEMO_USER_KEY;
 let winningKey = process.env.WINNING_KEY;
// let privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' //player 1
// let privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'//;player2
const contractName = "Gambling3";

async function main() {

    const url = process.env.GOERLI_URL;
    // const url = process.env.OPTIMISM_URL;

    // const url = 'http://localhost:8545'
    let provider = new ethers.providers.JsonRpcProvider(url);
    let wallet = new ethers.Wallet(privateKey, provider);
    const balance = await wallet.getBalance();
    const etherBalance = ethers.utils.formatEther(balance);
    console.log(`Wallet Address: ${wallet.address}`);
    console.log(`Balance: ${etherBalance} ETH`);

    let demoWallet = new ethers.Wallet(demoUserKey, provider);
    const demoBalance = await demoWallet.getBalance();
    const demoEtherBalance = ethers.utils.formatEther(demoBalance);
    console.log(`Demo User Wallet Address: ${demoWallet.address}`);
    console.log(`Demo User Balance: ${demoEtherBalance} ETH`);

    let winningWallet = new ethers.Wallet(winningKey, provider);
    const winningbalance = await winningWallet.getBalance();
    const winningetherBalance = ethers.utils.formatEther(winningbalance);
    console.log(`House Balance: ${winningetherBalance} ETH`);

    const amountToSend = ethers.utils.parseEther('.0001'); // Sending 0.1 Ether

    const nonce = await provider.getTransactionCount(wallet.address, 'latest');


    async function sendEther() {
      try {
        // Create a transaction object
        const txx = {
        //   nonce: nonce, //might not need this line for mainnet
          to: gameAddr,
          value: amountToSend,
        //   gasPrice: ethers.utils.parseUnits('200000', 'gwei'), // Increase the gas price

        };
    
        // Sign the transaction
        const txResponse = await demoWallet.sendTransaction(txx);
    
        // Wait for the transaction to be mined
        await txResponse.wait();
    
        console.log(`Transaction hash: ${txResponse.hash}`);
        console.log('Transaction sent successfully!');
      } catch (error) {
        console.error('Error sending Ether:', error);
      }
    }
    
    //    await  sendEther(); //await makes this function run first before the rest of the code runs

    const demoGame = await hre.ethers.getContractAt(contractName, gameAddr,demoWallet);

    try{
    const userNumber = await demoGame.placeBet(9)
    }
    catch (error) {
        if (error.message.includes("You have no credits left")) {
            console.log("You have no credits left, please deposit .0001 eth for 1 credit ");    }
            else {
              console.error(error);
          }
    }

    const game = await hre.ethers.getContractAt(contractName, gameAddr,wallet);



    let testAcc = '0x9A270d907094fE3aDF9D2dA89265E0405f6E2142'
    try{
      const gameCredits = await game.getGamesCredits(testAcc)

      console.log("the game credits are", gameCredits.toString())

    const contractBalance = await hre.ethers.provider.getBalance(game.address);
    const contractBalanceInEther = hre.ethers.utils.formatEther(contractBalance);


    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const randomInt = getRandomInt(1, 10); // Random integer between 1 and 100 (inclusive)
    console.log(randomInt);

    const tx = await game.playGame (9, testAcc )
  
    //console.log(tx)
    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    const gameResult = await game.result()
    //console.log(receipt.events);
    const gamesPlayed = await game.getGamesPlayed(testAcc)
    const gameFunds = await game.transfer()
    console.log("you have a 1 in 10 chance of WINNING!, guess a number between 1 and 10, if you guess correctly you will win the jackpot. If you guess wrong, the House will win half of your bet, and the rest goes to the jackpot. GOOD LUCK!")
    console.log("the owner address is", await game.gameOwner())
    console.log("the games played is ", gamesPlayed.toString())
    console.log("the game credits are", gameCredits.toString())
    console.log("the game result is", gameResult.toString())
    
    if (gameResult == true) {
      console.log("you won, you will be paid", contractBalanceInEther, "eth")
      console.log("Your wallet balance will be updated once the transaction is mined, this should take less than a minute")
    }
    else {
      console.log("you lost")
      console.log("the jackpot is:", contractBalanceInEther)

    }

    // console.log(receipt.events);
  

    
  }
  catch (error) {
    if (error.message.includes("You have no credits left")) {
      console.log("You have no credits left, please deposit .0001 eth for 1 credit ");    }
      else {
        console.error(error);
    }
    
    }
      
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
