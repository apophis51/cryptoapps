//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";


contract Gambling3 {
address public gameOwner;
address public houseWallet;
uint256 public transfer;
uint256 public _gameCredits;
uint public balance = address(this).balance;
bool public initialized;
bool public result;


  constructor(address _houseWallet) {
        gameOwner = msg.sender;
        initialized = false;
        houseWallet = _houseWallet;
  }


event YouWin(uint number, uint gamesPlayed, uint256 balance);
event YouLoose(uint number, uint gamesPlayed, uint256 balance);
event GetBalance(uint balance);

mapping(address => uint) private gamesPlayed;
mapping(address => uint) private gameCredits; // when client pays for a game, we store the amount of game credits they have
mapping(address => uint) private numberGuessed;

receive() external payable { 
      transfer += msg.value;
      gameCredits[msg.sender] += msg.value / 100000000000000;
    }

function placeBet(uint _guess) public {
    require(gameCredits[msg.sender] > 0, "You have no credits left, please top up");

    numberGuessed[msg.sender] = _guess;
}

function initializeValue() public {
        require(!initialized, "Value already initialized");
        gameCredits[msg.sender] = 0; // Set an initial value
        gamesPlayed[msg.sender] = 0;
        initialized = true;
    }

 function getGamesCredits(address player) public view returns (uint) {
        return gameCredits[player];
    }

 function getGamesPlayed(address player) public view returns (uint) {
        return gamesPlayed[player];
    }

function getBalance() public{
    emit GetBalance(transfer);
}

 function playGame(uint randomNumber, address player1) public payable{
   console.log('game credits', gameCredits[player1]);

    require(msg.sender == gameOwner, "The RandomNumber Owner Must Cosign This Transaction");
    require(gameCredits[player1] > 0, "You have no credits left, please top up");
    gamesPlayed[player1]++;
    gameCredits[player1]--;
    if (numberGuessed[player1] == randomNumber)
    {
    (bool success,  ) = player1.call{ value: transfer }("");
	require(success);
    result = true;
    emit YouWin(randomNumber, gamesPlayed[player1], transfer);
        transfer = 0;
    }
    else{
    result = false;
    (bool success,  ) = houseWallet.call{ value: transfer/2 }("");
	require(success);
    transfer = transfer - transfer/2;
    emit YouLoose(randomNumber, gamesPlayed[player1], transfer);
    }

 }


}