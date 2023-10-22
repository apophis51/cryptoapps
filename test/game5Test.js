const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game51', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game51');
    const game = await Game.deploy();
    const signer = ethers.provider.getSigner(0);

    return { game, signer };
  }
  it('should be a winner', async function () {
    const { game,signer } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const address = await signer.getAddress();

    // await game.connect(signer).write(address);

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
