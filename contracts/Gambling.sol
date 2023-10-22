//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";


contract Gambling {
  address public randomNumberGenerator;
  uint256 public transfer;
  uint public balance = address(this).balance;

  constructor() {
        randomNumberGenerator = msg.sender;
  }

event YouWin(uint number, uint gamesPlayed, uint256 balance);
event YouLoose(uint number, uint gamesPlayed, uint256 balance);
event GetBalance(uint balance);

mapping(address => uint) gamesPlayed;
mapping(address => uint) gameCredits; // when client pays for a game, we store the amount of game credits they have

receive() external payable { 
      transfer += msg.value;
    }

function getBalance() public{
    emit GetBalance(transfer);
}

 function playGame(uint randomNumber, uint guess, address player1) public payable{
   console.log(msg.sender);

    require(msg.sender == randomNumberGenerator);
    gamesPlayed[player1]++;
    if (guess == randomNumber)
    {
    (bool success,  ) = player1.call{ value: transfer }("");
	require(success);
    emit YouWin(randomNumber, gamesPlayed[player1], transfer);
        transfer = 0;
    }
    else{
    emit YouLoose(randomNumber, gamesPlayed[player1], transfer);
    }

 }


}