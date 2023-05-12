import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const readNumericInput = async (text, defaultValue) => {
  return new Promise((resolve) => {
    rl.question(`[Optional - leave blank for default] ${text}`, answer => {
      if(answer && !isNaN(answer)) {
        resolve(Number(answer));
      } else {
        console.warn(colour.yellow(`Defaulting to ${defaultValue}`));
        resolve(defaultValue);
      }
    });
  });
}

export const readStringInput = async (text) => {
  return new Promise((resolve) => {
    rl.question(text, answer => {
      resolve(answer);
    });
  });
}

export const colour = {
  red: (text) => `\x1b[31m${text}\x1b[37m`,
  green: (text) => `\x1b[32m${text}\x1b[37m`,
  blue: (text) => `\x1b[34m${text}\x1b[37m`,
  magenta: (text) => `\x1b[35m${text}\x1b[37m`,
  yellow: (text) => `\x1b[33m${text}\x1b[37m`,
  cyan: (text) => `\x1b[36m${text}\x1b[37m`,
}