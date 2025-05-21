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
  private static readonly VANA_EPOCH = 1009810800000; // January 1, 2002, 15:00 GMT
  private static readonly VANA_MULTIPLIER = 25;
  private static readonly SECONDS_PER_DAY = 86400;
  private static readonly SECONDS_PER_HOUR = 3600;
  private static readonly SECONDS_PER_MINUTE = 60;
  
  private static readonly WEEKDAYS = [
    'Firesday', 'Earthsday', 'Watersday', 'Windsday', 
    'Iceday', 'Lightningday', 'Lightsday', 'Darksday'
  ];
   
  private static readonly MOON_PHASES = [
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent',
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous'
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
    const formatted = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    
    return { hours, minutes, seconds, formatted };
  }

  /**
   * Get current Vana'diel date
   */

  public static getDate(): VanaDate {
    const totalSeconds = this.getVanaSeconds();
    const totalDays = Math.floor(totalSeconds / this.SECONDS_PER_DAY);
    const weekday = totalDays % 8;
    const weekdayName = this.WEEKDAYS[weekday];
    const day = (totalDays % 30) + 1;
    const month = (Math.floor(totalDays / 30) % 12) + 1;
    const year = Math.floor(totalDays / 360) + 886; // Vana'diel starts at year 886
    
    const msGameDay = this.SECONDS_PER_DAY * 1000 / this.VANA_MULTIPLIER; 
    const localTime = Date.now();
    const moonDate = new Date();

    moonDate.setUTCFullYear(2004, 0, 25); // Set date to 2004-01-25
    moonDate.setUTCHours(2, 31, 12, 0);   // Set time to 02:31:12.0000

    const moonEpoch = moonDate.getTime();
    const moonDays = Math.floor((localTime - moonEpoch) / msGameDay) % 84;
    const moonPercent = -Math.round((42 - moonDays) / 42 * 100);
    
    let moonPhase = 0;
    
    if (moonPercent <= -94) {
      moonPhase = 0; 
    } else if (moonPercent >= 90) {
      moonPhase = 0; 
    } else if (moonPercent >= -93 && moonPercent <= -62) {
      moonPhase = 1; 
    } else if (moonPercent >= -61 && moonPercent <= -41) {
      moonPhase = 2; 
    } else if (moonPercent >= -40 && moonPercent <= -11) {
      moonPhase = 3; 
    } else if (moonPercent >= -10 && moonPercent <= 6) {
      moonPhase = 4; 
    } else if (moonPercent >= 7 && moonPercent <= 36) {
      moonPhase = 5; 
    } else if (moonPercent >= 37 && moonPercent <= 56) {
      moonPhase = 6; 
    } else if (moonPercent >= 57 && moonPercent <= 89) {
      moonPhase = 7; 
    }
    
    const moonPhaseName = this.MOON_PHASES[moonPhase];
    const displayMoonPercent = Math.abs(moonPercent);
    
    return {
      weekday,
      weekdayName,
      day,
      month,
      year,
      moonPhase,
      moonPhaseName,
      moonPercent: displayMoonPercent
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