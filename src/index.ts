// src/index.ts - Main entry point for the package

// Export the calculator
export { VanaTimeCalculator } from './utils/VanaTimeCalculator';
export type { VanaTime, VanaDate } from './utils/VanaTimeCalculator';

// Export Vue components
export { default as VanadielTime } from './components/VanadielTime.vue';
export { default as SimpleVanadielClock } from './components/SimpleVanadielClock.vue';

// Export helper functions if needed
export * from './utils/helpers';
