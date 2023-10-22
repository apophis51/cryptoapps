// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Game11 {
  bool public isWon;
  bool public unlocked;

  function unlock() external {
    unlocked = true;
  }

  function win() external {
    require(unlocked, "Nope. Try again!");

    isWon = true;
  }
}