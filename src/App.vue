<script setup>
import { ref } from 'vue';
import { fetchCurrentWeather } from './api/weather';

const city = ref(null); 
const weatherData = ref(null);
const isLoading = ref(false);
const error = ref(null);

const loadWeather = async () => {
  if (!city.value.trim()) return;

  try {
    isLoading.value = true;
    error.value = null;
    weatherData.value = await fetchCurrentWeather(city.value);
  } catch (err) {
    error.value = 'Не удалось загрузить данные';
    console.error("Ошибка загрузки данных:", err);
  } finally {
    isLoading.value = false;
  }
};

loadWeather();

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    loadWeather();
  }
};
</script>

<template>
  <div class="search-container">
      <input
        v-model="city"
        @keypress="handleKeyPress"
        placeholder="Введите город"
        class="search-input"
      />
      <button @click="loadWeather" class="search-button">
        Поиск
      </button>
    </div>
  <div class="weather-app">    
    <div class="header">Погода</div>
    
    <section v-if="!isLoading" class="weather-content">
      <div class="temperature-block">
        {{ weatherData?.temp_c }}°
      </div>
      
      <div class="details-grid">
        <div class="detail-card">
          <div class="detail-icon">💧</div>
          <div class="detail-value">{{ weatherData?.humidity }}%</div>
          <div class="detail-label">Влажность</div>
        </div>
        
        <div class="detail-card">
          <div class="detail-icon">
            <svg class="wind-icon" viewBox="0 0 24 24" :style="{ transform: `rotate(${weatherData?.wind_degree}deg)` }"> 
              <path d="M12 2L4 12L12 22M20 12H4"/>
            </svg>
          </div>
          <div class="detail-value">{{ (weatherData?.wind_kph * 10 / 36).toFixed(1) }}</div>
          <div class="detail-label">м/с {{ weatherData?.wind_dir }}</div>
        </div>
        
        <div class="detail-card">
          <div class="detail-icon">⏱️</div>
          <div class="detail-value">{{ (weatherData?.pressure_mb * 0.750062).toFixed() }}</div>
          <div class="detail-label">мм рт.ст.</div>
        </div>
      </div>
    </section>
    
    <section v-else class="loading-section">
      <div class="loading-spinner"></div>
    </section>
  </div>
</template>

<style scoped>
.weather-app {
  max-width: 375px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(to bottom, #3a7bd5, #00d2ff);
  color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.header {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.weather-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temperature-block {
  font-size: 72px;
  font-weight: 300;
  margin-bottom: 30px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
}

.detail-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.detail-value {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.detail-label {
  font-size: 12px;
  opacity: 0.8;
}

.wind-icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(90deg);
}

.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Адаптация для темной темы */
@media (prefers-color-scheme: dark) {
  .weather-app {
    background: linear-gradient(to bottom, #1a2a4e, #3a7bd5);
  }
}
</style>