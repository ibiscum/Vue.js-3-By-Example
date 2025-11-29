<template>
  <div>
    <h1>User Info</h1>
    <ul>
      <li>
        <img id="avatar" :src="userData.avatar_url" />
      </li>
      <li>username: {{userData.login}}</li>
      <li>followers: {{userData.followers}}</li>
      <li>plan: {{userData.plan && userData.plan.name}}</li>
    </ul>
  </div>
</template>

<script>
import { octokitMixin } from "../mixins/octokitMixin";

export default {
  name: "UserComp",
  mixins: [octokitMixin],
  data() {
    return {
      userData: {},
    };
  },
  async mounted() {
    const octokit = this.createOctokitClient();
    const { data: userData } = await octokit.request("/user");
    this.userData = userData;
  },
  methods: {
    saveToken() {},
  },
};
</script>


<style scoped>
#avatar {
  width: 50px;
  height: 50px;
}
</style>
