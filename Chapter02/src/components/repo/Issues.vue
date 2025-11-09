<template>
  <div v-if="issues.length > 0">
    <button @click="showIssues = !showIssues">{{showIssues ? 'Hide' : 'Show'}} issues</button>
    <div v-if="showIssues">
      <div v-for="i of issues" :key="i.id">
        <h3>{{i.title}}</h3>
        <a :href="i.url">Go to issue</a>
        <IssueComments :owner="owner" :repo="repo" :issue-number="i.number" />
      </div>
    </div>
  </div>
</template>

<script>
import { octokitMixin } from "../../mixins/octokitMixin";
import IssueComments from "./issue/Comments.vue";

export default {
  name: "RepoIssues",
  components: {
    IssueComments,
  },
  mixins: [octokitMixin],
  props: {
    owner: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      issues: [],
      showIssues: false,
    };
  },
  watch: {
    owner: {
      immediate: true,
      handler(val) {
        this.getRepoIssues(val, this.repo);
      },
    },
    repo: {
      immediate: true,
      handler(val) {
        this.getRepoIssues(this.issues, val);
      },
    },
  },
  methods: {
    async getRepoIssues(owner, repo) {
      if (typeof owner !== "string" || typeof repo !== "string") {
        return;
      }
      const octokit = this.createOctokitClient();
      const { data: issues } = await octokit.issues.listForRepo({
        owner,
        repo,
      });
      this.issues = issues;
    },
  },
};
</script>
