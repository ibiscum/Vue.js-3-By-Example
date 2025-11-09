<template>
  <div>
    <h1>Github App</h1>
    <GitHubTokenForm />
    <UserComp />
    <ReposComp />
  </div>
</template>

<script setup>
import GitHubTokenForm from "./components/GitHubTokenForm.vue";
import ReposComp from "./components/Repos.vue";
import UserComp from "./components/User.vue";
</script>

<style scoped></style>
