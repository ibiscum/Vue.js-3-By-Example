<template>
  <div>
    <Puzzles @puzzle-changed="selectedPuzzleId = $event" />
    <Records />
    <SliderPuzzle :puzzle-id="selectedPuzzleId" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SliderPuzzle from "./components/SliderPuzzleComp.vue";
import Puzzles from "./components/PuzzlesComp.vue";
import Records from "./components/RecordsComp.vue";
const selectedPuzzleId = ref("cut-pink");
</script>
