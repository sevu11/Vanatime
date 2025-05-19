// src/utils/helpers.ts - Additional helper functions

/**
 * Format a number as a two-digit string (e.g., 1 -> "01")
 */
export const padZero = (num: number): string => {
  return num.toString().padStart(2, '0');
};

/**
 * Convert Vana'diel time to Earth time (approximate)
 * 1 Vana'diel day = 57.6 Earth minutes
 */
export const vanaToEarthMinutes = (vanaDays: number): number => {
  return vanaDays * 57.6;
};

/**
 * Convert Earth time to Vana'diel time
 * 1 Earth minute = 25 Vana'diel minutes
 */
export const earthToVanaMinutes = (earthMinutes: number): number => {
  return earthMinutes * 25;
};

/**
 * Calculate time until next game day
 * Returns seconds until next day
 */
export const secondsUntilNextDay = (currentVanaSeconds: number): number => {
  const secondsInDay = 86400;
  const currentDaySeconds = currentVanaSeconds % secondsInDay;
  return secondsInDay - currentDaySeconds;
};

/**
 * Determine if it's currently day or night in Vana'diel
 * Day hours are 6:00 to 18:00
 */
export const isVanadielDay = (vanaHours: number): boolean => {
  return vanaHours >= 6 && vanaHours < 18;
};
