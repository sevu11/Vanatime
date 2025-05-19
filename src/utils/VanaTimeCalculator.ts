// src/utils/VanaTimeCalculator.ts - Main calculator for Vana'diel time

/**
 * Interface for Vana'diel time
 */
export interface VanaTime {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

/**
 * Interface for Vana'diel date
 */
export interface VanaDate {
  weekday: number;
  weekdayName: string;
  day: number;
  month: number;
  year: number;
  moonPhase: number;
  moonPhaseName: string;
  moonPercent: number;
}

/**
 * Calculator for Vana'diel time and date
 * 
 * Vana'diel time runs at 25 times the speed of Earth time:
 * - 1 Earth hour = 25 Vana'diel hours
 * - 1 Earth day = 600 Vana'diel hours = 25 Vana'diel days
 * - 1 Vana'diel day = 24 Vana'diel hours = 57.6 Earth minutes
 */
export class VanaTimeCalculator {
  // Constants for time conversion
  private static readonly VANA_EPOCH = 1009810800000; // January 1, 2002, 15:00 GMT
  private static readonly VANA_MULTIPLIER = 25;
  private static readonly SECONDS_PER_DAY = 86400;
  private static readonly SECONDS_PER_HOUR = 3600;
  private static readonly SECONDS_PER_MINUTE = 60;
  
  // Vana'diel calendar constants
  private static readonly WEEKDAYS = [
    'Firesday', 'Earthsday', 'Watersday', 'Windsday', 
    'Iceday', 'Lightningday', 'Lightsday', 'Darksday'
  ];
   
  private static readonly MOON_PHASES = [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ];

  /**
   * Get current Vana'diel time in seconds since Vana'diel epoch
   */
  public static getVanaSeconds(): number {
    const earthMs = Date.now() - this.VANA_EPOCH;
    const vanaSeconds = Math.floor((earthMs / 1000) * this.VANA_MULTIPLIER);
    return vanaSeconds;
  }

  /**
   * Get current Vana'diel time (hours, minutes, seconds)
   */
  public static getTime(): VanaTime {
    const totalSeconds = this.getVanaSeconds();
    const secondsOfDay = totalSeconds % this.SECONDS_PER_DAY;
    
    const hours = Math.floor(secondsOfDay / this.SECONDS_PER_HOUR);
    const minutes = Math.floor((secondsOfDay % this.SECONDS_PER_HOUR) / this.SECONDS_PER_MINUTE);
    const seconds = secondsOfDay % this.SECONDS_PER_MINUTE;
    
    // Format without seconds as per requirement
    const formatted = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    
    return { hours, minutes, seconds, formatted };
  }

  /**
   * Get current Vana'diel date
   */
  public static getDate(): VanaDate {
    const totalSeconds = this.getVanaSeconds();
    const totalDays = Math.floor(totalSeconds / this.SECONDS_PER_DAY);
    
    // Calculate date components
    const weekday = totalDays % 8;
    const weekdayName = this.WEEKDAYS[weekday];
    
    const day = (totalDays % 30) + 1;
    const month = (Math.floor(totalDays / 30) % 12) + 1;
    
    const year = Math.floor(totalDays / 360) + 886; // Vana'diel starts at year 886
    
    // Calculate moon phase (8 phases, changes every 3.75 Earth days)
    const moonCycle = totalDays % 30; // 30 day moon cycle
    const moonPhase = Math.floor(moonCycle / 3.75);
    const moonPhaseName = this.MOON_PHASES[moonPhase];
    
    // Calculate moon percentage (0-100%)
    let moonPercent = 0;
    if (moonPhase < 4) {
      // Waxing (0% to 100%)
      moonPercent = Math.round((moonPhase * 25) + ((moonCycle % 3.75) / 3.75 * 25));
    } else {
      // Waning (100% to 0%)
      moonPercent = Math.round(100 - (((moonPhase - 4) * 25) + ((moonCycle % 3.75) / 3.75 * 25)));
    }
    
    return {
      weekday,
      weekdayName,
      day,
      month,
      year,
      moonPhase,
      moonPhaseName,
      moonPercent
    };
  }

  /**
   * Format current Vana'diel date and time as a string
   */
  public static formatDateTime(): string {
    const time = this.getTime();
    const date = this.getDate();
    
    return `${time.formatted} on ${date.weekdayName}, ${date.day}/${date.month}, ${date.year}`;
  }

  /**
   * Helper to pad numbers with leading zeros
   */
  private static padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
