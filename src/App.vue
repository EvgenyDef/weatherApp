<script setup>

import { ref, onMounted } from 'vue';
import { fetchCurrentWeather } from './api/weather';
import '@/assets/fonts.css';

const tempCity = ref(null); 
let city = null;
const weatherData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const sochiWeather = ref(null);
const moscowWeather = ref(null);
const peterburgWeather = ref(null);
const habarovskWeather = ref(null);

const loadWeather = async () => {
  try {
    city = tempCity.value
    isLoading.value = true;
    error.value = null;
    weatherData.value = await fetchCurrentWeather(city);
  } catch (err) {
    error.value = 'Не удалось загрузить данные';
    console.error("Ошибка загрузки данных:", err);
  } finally {
    isLoading.value = false;
  }
};

const loadCitiesWeather = async () => {
  try {
    error.value = null;

    sochiWeather.value = await fetchCurrentWeather("Сочи");
    moscowWeather.value = await fetchCurrentWeather("Москва");
    peterburgWeather.value = await fetchCurrentWeather("Санкт-Петербург");
    habarovskWeather.value = await fetchCurrentWeather("Хабаровск");

    console.log(sochiWeather?.maxtemp_c);
  } 
  catch (err) {
    error.value = 'Не удалось загрузить данные';
    console.error("Ошибка загрузки данных:", err);
  }
}

onMounted(loadCitiesWeather);

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
  <!--Тут берем иконку градусника-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 

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
        v-model="tempCity"
        @keypress="handleKeyPress"
        placeholder="В каком городе вы находитесь?"
        class="input-field"
        />
      </div> 
    </header>

    <main>
      <section v-if="!isLoading" class="main-block">
        <div>
          <div class="small-text">
            <i class='fa fa-thermometer'></i> Температура
          </div>
          <div class="average-text">
            {{ city }}
          </div>
          <div class="temperature-block">
            {{ weatherData?.temp_c }}°
          </div>
          <div>
            {{ weatherData?.condition }}
          </div>
          <div>
            мин. {{ weatherData?.mintemp_c }}° макс. {{ weatherData?.maxtemp_c }}°
          </div>
        </div>
        
      </section>

      <section v-if="!isLoading">
        
          <div class="params">
            <div class="add-block">
              Ветер
              <!--Сделайте стрелку-->
              <div class="average-text">
                {{ (weatherData?.wind_kph * 10 / 36).toFixed(1) }} м/с
              </div>
            </div>
            <div class="add-block">
              Давление
              <div class="average-text">
                {{ (weatherData?.pressure * 0.750062).toFixed() }} мм рт. ст.
              </div>
            </div>
          </div>


          <div class="params">
            <div class="add-block">
              Шанс выпадения осадков
              <div class="average-text">
                {{ weatherData?.chance_precip }} %
              </div>
            </div>
            <div class="add-block">
              Восход и закат
              <div class="average-text">
                {{ weatherData?.sunrise }}
              </div>
              <div class="average-text">
                {{ weatherData?.sunset }}
              </div>
            </div>
          </div>
       
      </section>

      <section v-else>
        <div class="noInfoContainer">
          <div class="weatherTitle">
            Узнайте погоду в своём городе
          </div>
          <div>
            <img 
            src="@/components/icons/Vector 1.svg" 
            class="arrowToFind"
            >
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div>
        <h3>Погода в других городах</h3>
      </div>

      <section class="cont">
        <div class="additional-city">
          <h2>Сочи</h2>
          <i class='fa fa-thermometer'></i> <span class="cities-temperature">{{ sochiWeather?.temp_c }}°</span>
          <div>мин. {{ sochiWeather?.mintemp_c }}° макс. {{ sochiWeather?.maxtemp_c }}°</div>
          <div> {{ sochiWeather?.condition }}</div>
        </div>


        <div class="additional-city">
          <h2>Москва</h2>
          <i class='fa fa-thermometer'></i> <span class="cities-temperature">{{ moscowWeather?.temp_c }}°</span>
          <div>мин. {{ moscowWeather?.mintemp_c }}° макс. {{ moscowWeather?.maxtemp_c }}°</div>
          <div> {{ moscowWeather?.condition }}</div>
        </div>


        <div class="additional-city">
          <h2>Санкт-Петербург</h2>
          <i class='fa fa-thermometer'></i> <span class="cities-temperature">{{ peterburgWeather?.temp_c }}°</span>
          <div>мин. {{ peterburgWeather?.mintemp_c }}° макс. {{ peterburgWeather?.maxtemp_c }}°</div>
          <div> {{ peterburgWeather?.condition }}</div>
        </div>


        <div class="additional-city">
          <h2>Хабаровск</h2>
          <i class='fa fa-thermometer'></i> <span class="cities-temperature">{{ habarovskWeather?.temp_c }}°</span>
          <div>мин. {{ habarovskWeather?.mintemp_c }}° макс. {{ habarovskWeather?.maxtemp_c }}°</div>
          <div> {{ habarovskWeather?.condition }}</div>
        </div>
      </section>
    </footer>




</template>

<style scoped>

footer {
  margin: 1.5rem 11rem;
}

.additional-city {
  width: 15rem;
  height: 10rem;
  padding: 0.4rem;
  border: 0.25rem solid white;
  border-radius: 25px;
  background: linear-gradient(to right, #c0cbdf, #EFFBFD);
}

.arrowToFind{
  margin-left: -40%;
}
.cont {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
}

.cities-temperature {
  font-size: 1.5rem;
}

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

.noInfoContainer{
  display: flex;
  pointer-events: none;
}
.weatherTitle {
  color: #B8B8B8;
  font-family: "Gilroy-m";
  font-size: 35px;
  min-width: 700px;
  margin-top: 20%;
  text-align: center;
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
  margin-top: 14%;
}

.input-field::placeholder {
  color: #B8B8B8;
  opacity: 1;
}

.logo {
  font-family: 'Oks';
  font-size: 100px;
  font-size: 5rem;
  color: #47CCFF;
  margin-top: 40px;
}


@font-face {
  font-family: Oks;
  src: url("./components/fonts/Oks Free.otf");
}

@font-face {
  font-weight: 300;
  font-family: Gilroy;
  src: url("./components/fonts/Gilroy-Light.ttf");
}
@font-face {
  font-weight: 400; 
  font-family: Gilroy;
  src: url("./components/fonts/Gilroy-Regular.ttf");
}
@font-face {
  font-weight: 500;
  font-family: Gilroy-m;
  src: url("./components/fonts/Gilroy-Medium.ttf");
}
@font-face {
  font-weight: 600;
  font-family: Gilroy;
  src: url("./components/fonts/Gilroy-Semibold.ttf");
}
@font-face {
  font-weight: 700; 
  font-family: Gilroy;
  src: url("./components/fonts/Gilroy-Bold.ttf");
}


header {
  margin-top: -3%;
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
  border: 0.25rem solid white;
  border-radius: 25px;
  background: linear-gradient(to right, #C2E7F5, #EFFBFD);
  margin: 1rem;
  padding: 1rem;
  width: 30%;
}

section {
  font-family: Gilroy;
}

.small-text {
  font-size: 1.2rem;
  font-family: Gilroy;
  font-weight: 500;
}

.numbers {
  font-family: Oks;
}

.average-text {
  font-size: 2.3rem;
  font-weight: 600;
}

.add-block {
  background-color: #B8B8B8;

  width: 15rem;

  margin: 1rem;
  padding: 0.5rem;

  border: 0.5rem solid white;
  border-radius: 25px;
}

.params {
  display: flex;
  justify-content: space-between;
}

main {
  margin: 1rem 10rem;
  display: flex;
  justify-content: center;
}

.weather-app {
  max-width: 375px;
  margin: 0 auto;
  font-family: "Gilroy";
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
  background: black;
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
  font-weight: 500;
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


</style>