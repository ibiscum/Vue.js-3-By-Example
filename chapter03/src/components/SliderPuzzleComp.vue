<template>
  <div>
    <h1>Swap the Images to Win</h1>
    <button id="start-button" @click="start">
      Start Game
    </button>
    <button id="quit-button" @click="stop">
      Quit
    </button>
    <p>Elapsed Time: {{ elapsedTime }}</p>
    <p v-if="isWinning">
      You win
    </p>
    <div class="row">
      <div v-for="(s, index) of shuffledPuzzleArray" :key="s" class="column" @click="swap(index)">
        <img :src="getImageUrl(s)" >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import moment from "moment";

const props = defineProps({
  puzzleId: {
    type: String,
    default: "cut-pink",
  },
});

const correctPuzzleArray = [
  "image_part_001",
  "image_part_002",
  "image_part_003",
  "image_part_004",
  "image_part_005",
  "image_part_006",
  "image_part_007",
  "image_part_008",
  "image_part_009",
];

const shuffledPuzzleArray = computed(() => {
  return [...correctPuzzleArray].sort(() => Math.random() - 0.5)
});
const indexesToSwap = ref([]);
const timer = ref(undefined);
const startDateTime = ref(new Date());
const currentDateTime = ref(new Date());

const isWinning = computed(() => {
  for (let i = 0; i < correctPuzzleArray.length; i++) {
    if (correctPuzzleArray[i] !== shuffledPuzzleArray[i]) {
      return false;
    }
  }
  return true;
});

const elapsedDiff = computed(() => {
  return currentDateTime.value - startDateTime.value;
});

const elapsedTime = computed(() => {
  const duration = moment.duration(elapsedDiff.value);
  const minutes = String(duration.minutes()).padStart(2, "0");
  const seconds = String(duration.seconds()).padStart(2, "0");
  return `${minutes}:${seconds}`;
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});

function swap(index) {
  if (indexesToSwap.value.length < 2) {
    indexesToSwap.value.push(index);
  }
  if (indexesToSwap.value.length === 2) {
    const firstIndex = indexesToSwap.value[0];
    const secondIndex = indexesToSwap.value[1];
    const temp = shuffledPuzzleArray[firstIndex];
    shuffledPuzzleArray[firstIndex] = shuffledPuzzleArray[secondIndex];
    shuffledPuzzleArray[secondIndex] = temp;
    indexesToSwap.value = [];
  }
};

function start() {
  resetTime();
  timer.value = setInterval(() => {
    currentDateTime.value = new Date();
  }, 1000);
}

function stop() {
  resetTime();
  clearInterval(timer);
}

function resetTime() {
  startDateTime.value = new Date();
  currentDateTime.value = new Date();
}

function recordSpeedRecords() {
  let records = JSON.parse(localStorage.getItem("records")) || [];
  const { elapsedTime, elapsedDiff } = this;
  records.push({ elapsedTime, elapsedDiff });
  const sortedRecords = records
    .sort((a, b) => a.elapsedDiff - b.elapsedDiff)
    .slice(0, 10);
  const stringifiedRecords = JSON.stringify(sortedRecords);
  localStorage.setItem("records", stringifiedRecords);
};

function getImageUrl(name) {
  return new URL(`../assets/${name}.jpg`, import.meta.url).href
}
</script>

<style scoped>
.row {
  display: flex;
  max-width: 90vw;
  flex-wrap: wrap;
}

.column {
  flex-grow: 1;
  width: 33%;
}

.column img {
  max-width: 100%;
}
</style>
