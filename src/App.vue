<script setup>

import { ref } from 'vue';
import { fetchCurrentWeather } from './api/weather';
import '@/assets/fonts.css';

const city = ref(null); 
const weatherData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const loadWeather = async () => {
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

const test = () => {
  console.log("было")
}




const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    loadWeather();
  }
};
</script>

<template>
    <header>
      <div class="logo">
        ЯСНО(?)
      </div>
      
      <div class="custom-input">
        <img 
        src="@/components/icons/search.svg" 
        alt="Search" 
        class="input-icon"
        @click="loadWeather"
      >
      <input
        v-model="city"
        @keypress="handleKeyPress"
        placeholder="В каком городе вы находитесь?"
        class="input-field"
        />
      </div> 
    </header>

    <main>
      <section v-if="!isLoading">
        <h1 class="weatherTitle">{{ weatherData.temp_c }}</h1>
      </section>
      <section v-else>
        <h1 class="weatherTitle">
          Узнайте погоду в своём городе
        </h1>
      </section>
    </main>






</template>

<style scoped>

.temp {
  width: 100%;
  height: 90%;
}

.custom-input {
  position: relative;
  width: 550px;
}

.input-icon {
  margin-top: 3.5%;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 24px;
  height: 24px;
}

.input-icon:hover {
  opacity: 0.9;
  cursor: pointer;
}

.weatherTitle {
  color: black;
}

.input-field {
  width: 100%;
  height: 78px;
  padding: 0 60px;
  border: 2px solid #B8B8B8;
  border-radius: 10px;
  font-family: "Gilroy";
  font-size: 16px;
  color: #B8B8B8;
  outline: none;
  margin-top: 91px;
}

.input-field::placeholder {
  color: #B8B8B8;
  opacity: 1;
}

.logo {
  font-family: 'Oks Free';
  font-size: 100px;
  color: #47CCFF;
  margin-top: 40px;
}



header {
  display: flex;
  justify-content: space-around;
}


.search-input {
  border-radius: 10px;
  border-color: #B8B8B8;
  font-family: "Gilroy";
  width: 550px;
  height: 78px;
  font-size: 18px;
  margin-top: 91px;
}

.main-block {
  border: 0.25rem solid rgba(255, 255, 255, 0);
  border-radius: 25px;
  background: linear-gradient(to right, #C2E7F5, #EFFBFD);
  margin: 1rem;
  width: 40%;
}

section {
  font-family: "Oks free";
}

.small-text {
  font-size: 1.2rem;
}

.average-text {
  font-size: 2.3rem;
}

.add-block {
  background-color: #E9F0F6;
  margin: 1rem;
  border: 0.25rem solid #E9F0F6;
  border-radius: 25px;
  width: 40%;
  height: 9rem;
}

main {
  display: flex;
  justify-content: space-around;
}

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