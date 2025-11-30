<template>
  <div>
    <h1>Select a Puzzle</h1>
    <div v-for="p of puzzles" :key="p.id" class="row">
      <div>
        <img :src="getImageUrl(p.image)">
      </div>
      <div>
        <h2>{{ p.title }}</h2>
      </div>
      <div class="play-button">
        <button @click="selectPuzzle(p)">
          Play
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const puzzles = [
  { id: 'cut-pink', image: "pink", title: "Pink Flower" },
  { id: 'cut-purple', image: "purple", title: "Purple Flower" },
  { id: 'cut-red', image: "red", title: "Red Flower" },
];

const emit = defineEmits(['puzzle-changed']);

function getImageUrl(name) {
  return new URL(`../assets/${name}.jpg`, import.meta.url).href
}

function selectPuzzle(puzzle) {
  console.log("Selected puzzle:", puzzle.id);
  emit("puzzle-changed", puzzle.id);}

</script>

<style scoped>
.row {
  display: flex;
  max-width: 90vw;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row img {
  width: 100px;
}

.row .play-button {
  padding-top: 25px;
}
</style>
