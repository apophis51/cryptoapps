// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Game61{
  bool public isWon;
  bool public unlocked;

  function unlock() external {
    unlocked = true;
  }

  function win() external  returns(bool){
    require(unlocked, "Nope. Try again!");

    isWon = true;
    return true;
  }
}