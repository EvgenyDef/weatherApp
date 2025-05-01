<script setup>
import { ref, onMounted } from 'vue';
import { fetchCurrentWeather } from './api/weather';

const weatherData = ref(null);

onMounted(async () => {
  try {
    weatherData.value = await fetchCurrentWeather(); 
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  } 
});

</script>

<template>
<div class="container">
<div class="block">Куку</div>
<div class="block"><p>{{ weatherData }}</p></div>
</div>
</template>

<style scoped>
.block {
  display: inline-block;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
</style>
