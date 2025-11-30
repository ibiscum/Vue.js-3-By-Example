<template>
  <div>
    <h1>Records</h1>
    <button @click="getRecords">
      Refresh
    </button>
    <div v-for="(r, index) of records" :key="index">
      {{ index + 1 }} - {{ r.elapsedTime }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const records = ref([]);

function getRecords() {
  const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
  records.value = storedRecords;
  console.log("Records loaded:", records.value);
}

onMounted(() => {
  getRecords();
});

</script>

