import { readNumericInput, readStringInput } from './input.js';
import SlotMachine from './slot-machine.js'

const readConfigInput = async () => {
  const initialPlayerBalance = await readNumericInput('Enter player balance amount ', 50);
  const initialMachineBalance = await readNumericInput('Enter machine balance ', 20);
  const initialFreeSpinsRemaining = await readNumericInput('Enter number of free spins to start ', 0);

  const costPerSpin = await readNumericInput('Enter cost per spin ', 0.2);
  const jackpotPayout = await readNumericInput('Enter jackpot payout ', 20);
  const differentCharsPayout = await readNumericInput('Enter different chars payout ', 10);
  const adjacentCharsMultiplier = await readNumericInput('Enter adjacent chars multiplier ', 5);
  const adjacentCharsPayout = adjacentCharsMultiplier * costPerSpin;

  return {
    initialPlayerBalance,
    initialMachineBalance,
    initialFreeSpinsRemaining,
    costPerSpin,
    jackpotPayout,
    differentCharsPayout,
    adjacentCharsMultiplier,
    adjacentCharsPayout,
  }
}

// async entry point
(async () => {
  const configInput = await readConfigInput();
  const slotMachine = new SlotMachine(configInput);

  while (true) {
    const exit = await readStringInput('Hit enter to spin or type "exit" to end the game.');
    if (exit === 'exit') process.exit();

    slotMachine.play();
  }
})();
