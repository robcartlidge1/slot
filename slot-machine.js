import { drawSlotMachine, drawBalances } from './ascii-art.js';

export default class SlotMachine {
  static symbols = ['A', 'B', 'C', 'D', 'E'];

  constructor(configInput) {
    this.machineBalance = configInput.initialMachineBalance;
    this.playerBalance = configInput.initialPlayerBalance;
    this.freeSpinsRemaining = configInput.initialFreeSpinsRemaining;

    this.costPerSpin = configInput.costPerSpin;
    this.jackpotPayout = configInput.jackpotPayout;
    this.differentCharsPayout = configInput.differentCharsPayout;
    this.adjacentCharsMultiplier = configInput.adjacentCharsMultiplier;
    this.adjacentCharsPayout = configInput.adjacentCharsMultiplier * configInput.costPerSpin;
  }

  play = () => {
    if (this.playerBalance < this.costPerSpin && this.freeSpinsRemaining <= 0) {
      console.log('Insufficient balance, game over.');
      return;
    }
    const reels = this.spinReelsAtRandom();

    drawSlotMachine(...reels, this.playerBalance, this.freeSpinsRemaining, this.machineBalance);

    if (this.freeSpinsRemaining > 0) {
      this.freeSpinsRemaining--;
    } else {
      this.playerBalance -= this.costPerSpin;
      this.machineBalance += this.costPerSpin;
    }

    let isAdjacentCharWin = false;
    for (let i = 0; i < reels.length - 1; i++) {
      if (reels[i] === reels[i + 1]) {
        isAdjacentCharWin = true;
        break;
      }
    }

    if (reels.every(s => s === reels[0])) {
      console.log(`Jackpot! You won £${this.jackpotPayout.toFixed(2)}.`);
      this.payout(this.jackpotPayout);
    } else if (new Set(reels).size === reels.length) {
      console.log(`All different characters! You won £${this.differentCharsPayout.toFixed(2)}.`);
      this.payout(this.differentCharsPayout);
    } else if (isAdjacentCharWin) {
      console.log(`Adjacent characters! You won £${this.adjacentCharsPayout.toFixed(2)}.`);
      this.payout(this.adjacentCharsPayout);
    }

    drawBalances(this.playerBalance, this.freeSpinsRemaining, this.machineBalance);
  }

  payout = (amount) => {
    const availablePayout = this.machineBalance - amount;
    if (availablePayout >= 0) {
      this.playerBalance += amount;
      this.machineBalance -= amount;
    } else {
      const amountToConvertToFreeSpins = Math.abs(availablePayout);
      this.freeSpinsRemaining += Math.floor(amountToConvertToFreeSpins / this.costPerSpin);
      this.playerBalance += this.machineBalance;
      this.machineBalance = 0;
    }

    // quick fix for floating point precision. E.g winning jackpot on first spin gives machine balance of 20.2 - 20 = 0.1999999999999993
    this.playerBalance = parseFloat(this.playerBalance.toFixed(2));
    this.machineBalance = parseFloat(this.machineBalance.toFixed(2));
  }

  spinReelsAtRandom = () => {
    const reels = [];
    for (let i = 0; i < 4; i++) {
      reels.push(SlotMachine.symbols[Math.floor(Math.random() * SlotMachine.symbols.length)]);
    }

    return reels;
  }
}