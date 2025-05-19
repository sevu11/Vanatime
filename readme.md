# Vanadiel Time

[![npm version](https://img.shields.io/npm/v/vanadiel-time.svg)](https://www.npmjs.com/package/vanadiel-time)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for calculating and displaying Vana'diel time from Final Fantasy XI, with Vue 3 components.

## Installation

```bash
npm install vanadiel-time
# or
yarn add vanadiel-time
```

## Features

- 🕒 Accurate Vana'diel time calculation
- 📅 Complete date and moon phase information
- 🖼️ Ready-to-use Vue 3 components
- 🧮 Standalone calculator with no dependencies
- 📏 Fully typed with TypeScript

## Usage

### Calculator Utility

```typescript
import { VanaTimeCalculator } from 'vanadiel-time';

// Get current time
const vanaTime = VanaTimeCalculator.getTime();
console.log(vanaTime.formatted); // "12:34:56"

// Get date information
const vanaDate = VanaTimeCalculator.getDate();
console.log(
  `${vanaDate.weekdayName}, ${vanaDate.monthName} ${vanaDate.day}, ${vanaDate.year}`
); // "Firesday, Järremont 15, 850"

// Get moon information
console.log(`${vanaDate.moonPhaseName} (${vanaDate.moonPercent}%)`); // "Waxing Crescent (35%)"

// Get everything at once
const fullTimestamp = VanaTimeCalculator.getFullTimestamp();
```

### Vue 3 Components

```vue
<template>
  <!-- Simple clock component -->
  <SimpleVanadielClock />
  
  <!-- Configure display options -->
  <SimpleVanadielClock :showDate="false" :showMoon="true" />
  
  <!-- Set update frequency (in milliseconds) -->
  <SimpleVanadielClock :updateInterval="500" />
  
  <!-- Alternative component with different styling -->
  <VanadielTime />
</template>

<script>
import { SimpleVanadielClock, VanadielTime } from 'vanadiel-time';

export default {
  components: {
    SimpleVanadielClock,
    VanadielTime
  }
}
</script>
```

### Helper Functions

```typescript
import { isVanadielDay, secondsUntilNextDay } from 'vanadiel-time';

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

### VanaTimeCalculator

Static methods:

- `getVanaSeconds()` - Get current Vana'diel time in seconds
- `getTime()` - Get current time (hours, minutes, seconds, formatted)
- `getDate()` - Get current date information
- `getFullTimestamp()` - Get complete time and date information
- `formatDateTime()` - Get formatted date and time string

### Vue Components

#### SimpleVanadielClock

Props:
- `showDate` (boolean, default: true) - Show date information
- `showMoon` (boolean, default: true) - Show moon information
- `updateInterval` (number, default: 1000) - Update interval in milliseconds

#### VanadielTime

Props:
- `showDate` (boolean, default: true) - Show date information
- `showMoon` (boolean, default: true) - Show moon information
- `updateInterval` (number, default: 1000) - Update interval in milliseconds

## License

MIT © [Your Name]
