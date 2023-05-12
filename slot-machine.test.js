import { jest } from '@jest/globals'
import SlotMachine from './slot-machine.js';
import { colour } from './input.js';

let slotMachine;

beforeEach(() => {
  slotMachine = new SlotMachine({
    initialMachineBalance: 20,
    initialPlayerBalance: 50,
    initialFreeSpinsRemaining: 0,

    costPerSpin: 0.2,
    jackpotPayout: 20,
    differentCharsPayout: 10,
    adjacentCharsMultiplier: 5
  });

  console.log = jest.fn();
});

describe('play()', () => {
  it('should debit player and credit machine when no win', () => {

    jest.spyOn(slotMachine, 'spinReelsAtRandom').mockImplementation(() => ['A', 'B', 'C', 'B']);

    slotMachine.play();

    expect(console.log).toHaveBeenCalledWith(colour.green('PLAYER BALANCE: £49.80'));
    expect(console.log).toHaveBeenCalledWith(colour.magenta('MACHINE BALANCE: £20.20'));
    expect(slotMachine.playerBalance).toBe(49.8);
    expect(slotMachine.machineBalance).toBe(20.2);
  });

  it('should not allow play with insufficient funds', () => {
    slotMachine.playerBalance = 0.1;

    slotMachine.play();

    expect(console.log).toHaveBeenCalledWith('Insufficient balance, game over.');
  });

  it('should payout adjacent reels', () => {

    jest.spyOn(slotMachine, 'spinReelsAtRandom').mockImplementation(() => ['A', 'A', 'B', 'C']);

    slotMachine.play();

    expect(console.log).toHaveBeenCalledWith(`Adjacent characters! You won £${slotMachine.adjacentCharsPayout.toFixed(2)}.`);
    expect(slotMachine.playerBalance).toBe(50.8);
    expect(slotMachine.machineBalance).toBe(19.2);
  });

  it('should payout different characters', () => {

    jest.spyOn(slotMachine, 'spinReelsAtRandom').mockImplementation(() => ['A', 'B', 'C', 'D']);

    slotMachine.play();

    expect(console.log).toHaveBeenCalledWith(`All different characters! You won £${slotMachine.differentCharsPayout.toFixed(2)}.`);
    expect(slotMachine.playerBalance).toBe(59.8);
    expect(slotMachine.machineBalance).toBe(10.2);
  });

  it('should payout jackpot', () => {

    jest.spyOn(slotMachine, 'spinReelsAtRandom').mockImplementation(() => ['A', 'A', 'A', 'A']);

    slotMachine.play();

    expect(console.log).toHaveBeenCalledWith(`Jackpot! You won £${slotMachine.jackpotPayout.toFixed(2)}.`);
    expect(slotMachine.playerBalance).toBe(69.8);
    expect(slotMachine.machineBalance).toBe(0.2);
  });

  it('should award free spins', () => {

    jest.spyOn(slotMachine, 'spinReelsAtRandom').mockImplementation(() => ['A', 'B', 'C', 'D']);
    slotMachine.play();
    slotMachine.play();
    slotMachine.play();

    // 3x adjacent wins = £30 payout after 3x20p plays. Meaning after £20 machine balance is used up
    // there's £9.40 worth of free spins are awarded (47 free spins)

    expect(slotMachine.playerBalance).toBe(70);
    expect(slotMachine.freeSpinsRemaining).toBe(47);
    expect(slotMachine.machineBalance).toBe(0);
  });

  it('should use free spins before taking players funds', () => {
    slotMachine.freeSpinsRemaining = 10;

    jest.spyOn(slotMachine, 'spinReelsAtRandom').mockImplementation(() => ['A', 'B', 'C', 'A']);
    slotMachine.play();

    expect(slotMachine.playerBalance).toBe(50);
    expect(slotMachine.freeSpinsRemaining).toBe(9);
    expect(slotMachine.machineBalance).toBe(20);
  });
});