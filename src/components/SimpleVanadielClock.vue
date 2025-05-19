<!-- src/components/SimpleVanadielClock.vue -->
<template>
  <div class="vanadiel-clock" :class="{ 'is-day': isDay, 'is-night': !isDay }">
    <div class="time">{{ time }}</div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { VanaTimeCalculator } from '../utils/VanaTimeCalculator';

export default defineComponent({
  name: 'SimpleVanadielClock',
  props: {
    updateInterval: {
      type: Number,
      default: 1000 // Update every second by default
    }
  },
  setup(props) {
    const time = ref('');
    const date = ref('');
    const isDay = ref(true);
    let intervalId: number | null = null;

    const updateTime = () => {
      const vanaTime = VanaTimeCalculator.getTime();
      const vanaDate = VanaTimeCalculator.getDate();
      
      time.value = vanaTime.formatted;
      date.value = `${vanaDate.weekdayName}, ${vanaDate.day}/${vanaDate.month}, ${vanaDate.year}`;
      
      // Day is between 6:00 and 18:00
      isDay.value = vanaTime.hours >= 6 && vanaTime.hours < 18;
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
      isDay
    };
  }
});
</script>

<style scoped>
.vanadiel-clock {
  font-family: 'Arial', sans-serif;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  transition: background-color 0.5s ease;
}

.is-day {
  background-color: #e6f7ff;
  color: #003366;
}

.is-night {
  background-color: #1a1a2e;
  color: #e6e6ff;
}

.time {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 1rem;
}
</style>
