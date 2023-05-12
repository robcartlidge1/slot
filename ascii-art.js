import {colour} from './input.js';

export const drawSlotMachine = (reel1, reel2, reel3, reel4) => {

  console.log(
  `                                              __
||=========================================||(__)
|===_______===_______===_______===_______===| ||
||*| _____ |*| _____ |*| _____ |*| _____ |*|| ||
||*||     ||*||     ||*||     ||*||     ||*|| ||
||*||  ${colour.magenta(reel1)}  ||*||  ${colour.magenta(reel2)}  ||*||  ${colour.magenta(reel3)}  ||*||  ${colour.magenta(reel4)}  ||*|| ||
||*||_____||*||_____||*||_____||*||_____||*|| ||
||*|_______|*|_______|*|_______|*|_______|*||_//
|===_______===_______===_______===_______===|_/
(___________________________________________)`);
}

export const drawBalances = (playerBalance, freeSpinsRemaining, machineBalance) => {
  console.log(colour.green(`PLAYER BALANCE: £${playerBalance.toFixed(2)}`));
  console.log(colour.green(`PLAYER FREE SPINS: ${freeSpinsRemaining}`));
  console.log(colour.magenta(`MACHINE BALANCE: £${machineBalance.toFixed(2)}`));
}