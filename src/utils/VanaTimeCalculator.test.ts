import { VanaTimeCalculator } from './VanaTimeCalculator';

// Mock Date.now() to return a specific timestamp for consistent testing
const MOCK_DATE = 1621123200000; // May 16, 2021 00:00:00 UTC
global.Date.now = jest.fn(() => MOCK_DATE);

describe('VanaTimeCalculator', () => {
  describe('getVanaSeconds', () => {
    it('calculates Vana\'diel seconds correctly', () => {
      const seconds = VanaTimeCalculator.getVanaSeconds();
      expect(typeof seconds).toBe('number');
      expect(seconds).toBeGreaterThan(0);
      expect(Number.isInteger(seconds)).toBe(true);
    });
  });

  describe('getTime', () => {
    it('returns a valid time object', () => {
      const time = VanaTimeCalculator.getTime();
      
      expect(time).toHaveProperty('hours');
      expect(time).toHaveProperty('minutes');
      expect(time).toHaveProperty('seconds');
      expect(time).toHaveProperty('formatted');    
      expect(time.hours).toBeGreaterThanOrEqual(0);
      expect(time.hours).toBeLessThan(24);
      expect(time.minutes).toBeGreaterThanOrEqual(0);
      expect(time.minutes).toBeLessThan(60);
      expect(time.seconds).toBeGreaterThanOrEqual(0);
      expect(time.seconds).toBeLessThan(60);
      expect(time.formatted).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('getDate', () => {
    it('returns a valid date object', () => {
      const date = VanaTimeCalculator.getDate();
      
      expect(date).toHaveProperty('weekday');
      expect(date).toHaveProperty('weekdayName');
      expect(date).toHaveProperty('day');
      expect(date).toHaveProperty('month');
      expect(date).toHaveProperty('year');
      expect(date).toHaveProperty('moonPhase');
      expect(date).toHaveProperty('moonPhaseName');
      expect(date).toHaveProperty('moonPercent');
      
      
      expect(date.weekday).toBeGreaterThanOrEqual(0);
      expect(date.weekday).toBeLessThan(8);
      expect(date.day).toBeGreaterThanOrEqual(1);
      expect(date.day).toBeLessThanOrEqual(30);
      expect(date.month).toBeGreaterThanOrEqual(1);
      expect(date.month).toBeLessThanOrEqual(12);
      expect(date.year).toBeGreaterThanOrEqual(0);
      expect(date.moonPhase).toBeGreaterThanOrEqual(0);
      expect(date.moonPhase).toBeLessThan(8);
      expect(date.moonPercent).toBeGreaterThanOrEqual(0);
      expect(date.moonPercent).toBeLessThanOrEqual(100);
    });
  });

  describe('formatDateTime', () => {
    it('returns a properly formatted string', () => {
      const formatted = VanaTimeCalculator.formatDateTime();
      
      // Should match pattern like "12:34 on Firesday, 15/5, 850"
      expect(formatted).toMatch(/^\d{2}:\d{2} on \w+, \d+\/\d+, \d+$/);
    });
  });
});
