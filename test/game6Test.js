const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game51', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game61');
    const game = await Game.deploy();

    return { game };
  }

  it('should be a winner', async function () {
    // leave this as-is
    const { game } = await loadFixture(deployContractAndSetVariables);

    // you must call unlock before you can win
    game.unlock();

    // leave this call to game.win() as-is
    let cool = await game.win();
    console.log("test",cool);

    // leave this testing assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
