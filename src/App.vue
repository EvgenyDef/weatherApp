<script setup>
import { ref, onMounted } from 'vue';
import { fetchCurrentWeather } from './api/weather';

const isLoading = ref(false);
const weatherData = ref(null);

onMounted(async () => {
  try {
    isLoading.value = true;
    weatherData.value = await fetchCurrentWeather(); 
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  } 
  finally{
    isLoading.value = false;
  }
});

</script>

<template>
<div class="container">
<div class="block">Куку</div>
<div class="block">
  <p v-if="!isLoading">Температура: {{ weatherData?.temp_c }}</p>
  <p v-else>Загрузка...</p>
</div>
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
