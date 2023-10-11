// add the game address here and update the contract name if necessary
const gameAddr = "0x7adFaD80b103AE73eb47F563a8AeF22D0f622737";
const contractName = "Game3";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:
  //const setX = await game.setX(25)
  //await setX.wait() // waits for transaction to be inclded in the block
  //const setY = await game.setY(25)
  //await setY.wait()
    const tx = await game.win(10);

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
