<!-- src/components/VanadielTime.vue -->
<template>
  <div class="vanadiel-time-widget" :class="{ 'is-day': isDay, 'is-night': !isDay }">
    <div class="time-section">
      <div class="time">{{ time.formatted }}</div>
      <div class="day-night-indicator">
        {{ isDay ? 'Day' : 'Night' }}
      </div>
    </div>
    
    <div class="date-section">
      <div class="weekday">{{ date.weekdayName }}</div>
      <div class="calendar-date">{{ date.day }}/{{ date.month }}, {{ date.year }}</div>
    </div>
    
    <div class="moon-section">
      <div class="moon-phase">{{ date.moonPhaseName }}</div>
      <div class="moon-visual">
        <div class="moon" :style="moonStyle"></div>
      </div>
      <div class="moon-percent">{{ date.moonPercent }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { VanaTimeCalculator, VanaTime, VanaDate } from '../utils/VanaTimeCalculator';

export default defineComponent({
  name: 'VanadielTime',
  props: {
    updateInterval: {
      type: Number,
      default: 1000 // Update every second by default
    },
    showMoon: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const time = ref<VanaTime>({
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: '00:00'
    });
    
    const date = ref<VanaDate>({
      weekday: 0,
      weekdayName: '',
      day: 1,
      month: 1,
      year: 0,
      moonPhase: 0,
      moonPhaseName: '',
      moonPercent: 0
    });
    
    const isDay = computed(() => {
      return time.value.hours >= 6 && time.value.hours < 18;
    });
    
    const moonStyle = computed(() => {
      // Calculate moon appearance based on phase
      const percent = date.value.moonPercent;
      
      // For simplicity, we'll just adjust the brightness based on moon percent
      const brightness = Math.min(100, Math.max(20, percent));
      
      return {
        backgroundColor: `hsl(220, 100%, ${brightness}%)`,
        boxShadow: `0 0 ${brightness / 10}px ${brightness / 5}px rgba(255, 255, 255, ${brightness / 100})`
      };
    });
    
    let intervalId: number | null = null;

    const updateTime = () => {
      time.value = VanaTimeCalculator.getTime();
      date.value = VanaTimeCalculator.getDate();
      
      // Emit an event with the current time and date
      emit('update', { time: time.value, date: date.value });
    };

    onMounted(() => {
      // Update immediately
      updateTime();
      
      // Set up interval for updates
      intervalId = window.setInterval(updateTime, props.updateInterval);
    });

    onUnmounted(() => {
      // Clean up interval when component is destroyed
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    });

    return {
      time,
      date,
      isDay,
      moonStyle
    };
  }
});
</script>

<style scoped>
.vanadiel-time-widget {
  font-family: 'Arial', sans-serif;
  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

.is-day {
  background: linear-gradient(135deg, #e6f7ff, #b3e0ff);
  color: #003366;
}

.is-night {
  background: linear-gradient(135deg, #1a1a2e, #0f0f1a);
  color: #e6e6ff;
}

.time-section {
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.time {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.day-night-indicator {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.date-section {
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.weekday {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.calendar-date {
  font-size: 1rem;
}

.moon-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.moon-phase {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.moon-visual {
  margin-bottom: 0.5rem;
}

.moon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);
}

.moon-percent {
  font-size: 0.9rem;
}
</style>
