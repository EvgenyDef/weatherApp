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

const weatherConditions = {
  1000: "Солнечно",
  1003: "Переменная облачность",
  1006: "Облачно",
  1009: "Пасмурно",
  1030: "Туман",
  1063: "Возможен местами дождь",
  1066: "Возможен местами снег",
  1069: "Возможна местами мокрая метель",
  1072: "Возможна местами ледяная морось",
  1087: "Возможны местами грозы",
  1114: "Метель",
  1117: "Сильная метель",
  1135: "Сильный туман",
  1147: "Ледяной туман",
  1150: "Местами легкая морось",
  1153: "Легкая морось",
  1168: "Ледяная морось",
  1171: "Сильная ледяная морось",
  1180: "Местами небольшой дождь",
  1183: "Небольшой дождь",
  1186: "Умеренный дождь временами",
  1189: "Умеренный дождь",
  1192: "Сильный дождь временами",
  1195: "Сильный дождь",
  1198: "Небольшой ледяной дождь",
  1201: "Умеренный или сильный ледяной дождь",
  1204: "Небольшой мокрый снег",
  1207: "Умеренный или сильный мокрый снег",
  1210: "Местами небольшой снег",
  1213: "Небольшой снег",
  1216: "Местами умеренный снег",
  1219: "Умеренный снег",
  1222: "Местами сильный снег",
  1225: "Сильный снег",
  1237: "Ледяная крупа",
  1240: "Небольшой ливень",
  1243: "Умеренный или сильный ливень",
  1246: "Сильный ливень",
  1249: "Небольшие ливни с мокрым снегом",
  1252: "Умеренные или сильные ливни с мокрым снегом",
  1255: "Небольшие снегопады",
  1258: "Умеренные или сильные снегопады",
  1261: "Небольшие ливни ледяной крупы",
  1264: "Умеренные или сильные ливни ледяной крупы",
  1273: "Местами небольшой дождь с грозой",
  1276: "Умеренный или сильный дождь с грозой",
  1279: "Местами небольшой снег с грозой",
  1282: "Умеренный или сильный снег с грозой"
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
            <img src="@/components/icons/thermometer-03.svg" class="conditionIcon">
            температура
          </div>
          <div class="average-text">
            {{ city }}
          </div>
          <div class="temperature-block">
            {{ weatherData?.temp_c }}°
          </div>
          <div class="condition-block">
            <img :src="weatherData?.condition_icon" style="max-block-size: 43px; vertical-align: middle;">
            {{ weatherConditions[weatherData?.condition] }}
          </div>
          <div class="minmaxTemp-block">
            <img src="@/components/icons/arrow-narrow-down.svg" class="conditionIcon">
            {{ weatherData?.mintemp_c }}° 
            <img src="@/components/icons/arrow-narrow-up-1.svg" class="conditionIcon">
            {{ weatherData?.maxtemp_c }}°
          </div>
        </div>
        
      </section>

      <section v-if="!isLoading">
        
          <div class="params">
            <div class="add-block-1">
              <div class="small-text">
                  <img src="@/components/icons/wind-02.svg" class="conditionIcon">
              ветер
              </div>
              <div style="text-align: center;">
                <span class="arrow" :style="{ transform: `rotate(${weatherData?.wind_degree}deg)` }">&uarr;</span>
              </div>
              
              <div class="average-text" style="text-align: center;">
                {{ (weatherData?.wind_kph * 10 / 36).toFixed(1) }} м/с
              </div>
            </div>
            <div class="add-block-1">
              <div class="small-text">
                  <img src="@/components/icons/speedometer-04.svg" class="conditionIcon">
                  давление
              </div>
              <div class="average-text" style="text-align: center;">
                {{ (weatherData?.pressure * 0.750062).toFixed() }} 
                <p>мм рт. ст.</p>
                
              </div>
            </div>
          </div>


          <div class="params">
            <div class="add-block-2">
              <div class="small-text">
                  <img src="@/components/icons/droplets-03.svg" class="conditionIcon">
                  осадки
                  <div class="average-text" style="margin-left: 0%;">
                    {{ weatherData?.precip }} мм
                  </div>
              </div>
              <p style="margin-left: 5%;">вероятность осадков</p>
              <div class="average-text">
                {{ weatherData?.chance_precip }} %
              </div>
            </div>
            <div class="add-block-2">
              <div class="small-text">
                  <img src="@/components/icons/sun-setting-01.svg" class="conditionIcon">
                  восход и закат
              </div>
              <div class="average-text">
                  <img src="@/components/icons/sunrise.svg" class="conditionIcon">
                  {{ weatherData?.sunrise }}
              </div>
              <div class="average-text">
                  <img src="@/components/icons/sunset.svg" class="conditionIcon">
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
          <img src="@/components/icons/thermometer-03.svg" alt="thermometer" class="thermometer"> <span class="cities-temperature">{{ sochiWeather?.temp_c }}°</span>
          <div><img src="@/components/icons/arrow-narrow-down.svg" alt="arrow-narrow-down" class="arrow"> {{ sochiWeather?.mintemp_c }}° <img src="@/components/icons/arrow-narrow-up-1.svg" alt="arrow-narrow-up" class="arrow"> {{ sochiWeather?.maxtemp_c }}°</div>
          <div> 
            <img :src="sochiWeather?.condition_icon" class="conditionIcon">
            {{ weatherConditions[sochiWeather?.condition] }}
          </div>
        </div>


        <div class="additional-city">
          <h2>Москва</h2>
          <img src="@/components/icons/thermometer-03.svg" alt="thermometer" class="thermometer"> <span class="cities-temperature">{{ moscowWeather?.temp_c }}°</span>
          <div><img src="@/components/icons/arrow-narrow-down.svg" alt="arrow-narrow-down" class="arrow"> {{ moscowWeather?.mintemp_c }}° <img src="@/components/icons/arrow-narrow-up-1.svg" alt="arrow-narrow-up" class="arrow"> {{ moscowWeather?.maxtemp_c }}°</div>
          <div> 
            <img :src="moscowWeather?.condition_icon" class="conditionIcon">
            {{ weatherConditions[moscowWeather?.condition] }}
          </div>
        </div>


        <div class="additional-city">
          <h2>Санкт-Петербург</h2>
          <img src="@/components/icons/thermometer-03.svg" alt="thermometer" class="thermometer"> <span class="cities-temperature">{{ peterburgWeather?.temp_c }}°</span> 
          <div><img src="@/components/icons/arrow-narrow-down.svg" alt="arrow-narrow-down" class="arrow"> {{ peterburgWeather?.mintemp_c }}° <img src="@/components/icons/arrow-narrow-up-1.svg" alt="arrow-narrow-up" class="arrow"> {{ peterburgWeather?.maxtemp_c }}°</div>
          <div> 
            <img :src="peterburgWeather?.condition_icon" class="conditionIcon">
            {{ weatherConditions[peterburgWeather?.condition] }}
          </div>
        </div>


        <div class="additional-city">
          <h2>Хабаровск</h2>
          <img src="@/components/icons/thermometer-03.svg" alt="thermometer" class="thermometer"> <span class="cities-temperature">{{ habarovskWeather?.temp_c }}°</span>
          <div><img src="@/components/icons/arrow-narrow-down.svg" alt="arrow-narrow-down" class="arrow"> {{ habarovskWeather?.mintemp_c }}° <img src="@/components/icons/arrow-narrow-up-1.svg" alt="arrow-narrow-up" class="arrow"> {{ habarovskWeather?.maxtemp_c }}°</div>
          <div> 
            <img :src="habarovskWeather?.condition_icon" class="conditionIcon">
            {{ weatherConditions[habarovskWeather?.condition] }}</div>
        </div>
      </section>
    </footer>




</template>

<style scoped>

.conditionIcon {
  vertical-align: middle;
  max-block-size: 24px;
}

footer {
  margin: 1.5rem 11rem;
}

.arrow {
  text-align: center;
  display: inline-block; 
  font-size: 3.5em; 
  transition: transform 0.3s ease-in-out; 
}

.additional-city {
  width: 15rem;
  height: 10rem;
  padding: 0.4rem;
  border: 0.25rem solid white;
  border-radius: 25px;
  background: linear-gradient(to right, #c0cbdf, #EFFBFD);
}

.thermometer {
  width: 1.3rem;
}
.cont {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
}

.arrow {
  width: 1.1rem;
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
  min-width: 450px;
  min-height: 400px;
  border-radius: 25px;
  background: linear-gradient(to right, #C2E7F5, #EFFBFD);
  margin: 1rem;
  padding: 1rem;
  width: 30%;
}

.condition-block{
  margin-left: 5%;
  font-family: Gilroy-m;
  font-size: 25px;
}

section {
  font-family: Gilroy;
}

.small-text {
  margin: 5%;
  font-size: 1.2rem;
  font-family: Gilroy-m;
  font-weight: 500;
}

.numbers {
  font-family: Oks;
}

.average-text {
  margin-left: 5%;
  font-size: 35px;
  font-weight: 600;
}

.add-block-1 {
  background-color: #E9F0F6;

  min-width: 225px;
  min-height: 212px;

  margin: 1rem;
  padding: 0.5rem;

  border: 0.5rem solid white;
  border-radius: 25px;
}

.add-block-2 {
  background-color: #E9F0F6;

  min-width: 225px;
  min-height: 177px;

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
  margin-top: -8%;
  margin-left: 5%;
  font-size: 87px;
  font-family: Oks;
  font-weight: 300;
  margin-bottom: 30px;

}

.minmaxTemp-block{
  margin-left: 5%;
  font-weight: 600;
  font-size: 24px;
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