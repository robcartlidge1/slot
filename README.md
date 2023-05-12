### [Run Solution]
`node app.js` and follow prompts. No package install required, all native code.

### [Run Tests]
`npm i` to install jest then `npm test` (you may need jest installed globally `npm i jest -g`)

### [Solution explanation]
`app.js` is the entry point for the application. It triggers the initial prompts to setup the slot machine.

`ascii-art.js` was a bit of fun adding a drawing of the slot machine out to the console.

`input.js` is a wrapper around the user input. It utilises promises so we don't need messy call backs in our code when waiting for user input.

`slot-machine.js` is where the business logic for the slot machine lives and works out how to credit/debit the machine and player.

`slot-machine.test.js` is a set of unit tests covering the slot machine business logic outlined in the spec.

### [Time taken]
Around 3-4 hours. A large part of that was messing around with ascii art for fun :see_no_evil:

The final part of the last requirement:
> This does not affect a jackpot win

Was unclear so was left out. E.g Did this mean free spins cannot trigger a jackpot, or the jackpot cannot be traded for free spins?
