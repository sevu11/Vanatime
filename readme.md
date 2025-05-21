# Vanatime

[![npm version](https://img.shields.io/npm/v/vanatime.svg)](https://www.npmjs.com/package/vanatime)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A NPM package for displaying Vana'diel time.
Re-written from scratch in Typescript. 
Insprired by [Pyogenes](http://www.pyogenes.com/ffxi/timer/v2.html). 

## Installation

```bash
npm install vanatime
# or
yarn add vanatime
```

## Features 

- 🕒 Accurate Vana'diel time calculation
- 📅 Complete date and moon phase information
- 🧮 Standalone calculator with no dependencies
- 📏 Fully typed with TypeScript

## Usage

```typescript
import { VanaTimeCalculator } from 'vanatime';

// Get current time
const vanaTime = VanaTimeCalculator.getTime();
console.log(vanaTime.formatted); // "12:34"

// Get date information
const vanaDate = VanaTimeCalculator.getDate();
console.log(
  `${vanaDate.weekdayName}, ${vanaDate.day}/${vanaDate.month}, ${vanaDate.year}`
); // "Firesday, 15/5, 850"

// Get moon information
console.log(`${vanaDate.moonPhaseName} (${vanaDate.moonPercent}%)`); // "Waxing Crescent (35%)"

// Get formatted date and time
const formattedDateTime = VanaTimeCalculator.formatDateTime();
console.log(formattedDateTime); // "12:34 on Firesday, 15/5, 850"
```

### Helper Functions

```typescript
import { isVanadielDay, secondsUntilNextDay } from 'vanatime';

// Check if it's day or night
const vanaTime = VanaTimeCalculator.getTime();
if (isVanadielDay(vanaTime.hours)) {
  console.log("It's daytime in Vana'diel");
}

// Calculate time until next game day
const vanaSeconds = VanaTimeCalculator.getVanaSeconds();
const nextDayIn = secondsUntilNextDay(vanaSeconds);
console.log(`Next Vana'diel day starts in ${nextDayIn} seconds`);
```

## API Reference

Static methods:

- `getVanaSeconds()` - Get current Vana'diel time in seconds
- `getTime()` - Get current time (hours, minutes, seconds, formatted)
- `getDate()` - Get current date information
- `formatDateTime()` - Get formatted date and time string

### Helper Functions

- `padZero(num: number)` - Format a number as a two-digit string
- `vanaToEarthMinutes(vanaDays: number)` - Convert Vana'diel time to Earth time
- `earthToVanaMinutes(earthMinutes: number)` - Convert Earth time to Vana'diel time
- `secondsUntilNextDay(currentVanaSeconds: number)` - Calculate time until next game day
- `isVanadielDay(vanaHours: number)` - Determine if it's currently day or night in Vana'diel

## License

MIT
