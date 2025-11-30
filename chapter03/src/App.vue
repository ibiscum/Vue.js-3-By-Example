<template>
  <div>
    <Puzzles @puzzle-changed="selectedPuzzleId = $event" />
    <Records />
    <SliderPuzzle :puzzle-id="selectedPuzzleId" />
  </div>
</template>

<script>
import SliderPuzzle from "./components/SliderPuzzleComp.vue";
import Puzzles from "./components/PuzzlesComp.vue";
import Records from "./components/RecordsComp.vue";

export default {
  name: "App",
  components: {
    SliderPuzzle,
    Puzzles,
    Records,
  },
  data() {
    return {
      selectedPuzzleId: "cut-pink",
    };
  },
};
</script>
