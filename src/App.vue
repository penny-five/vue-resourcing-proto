<template>
  <div id="app">
    <UserRow :key="user.id"
      :user="user"
      v-for="user in users"
      @setAllocation="onSetAllocation" />
  </div>
</template>

<script>
import UserRow from "./UserRow.vue";
import users from "./users";

const selectUser = (users, id) => users.find(user => user.id === id);

const selectProject = (projects, id) => projects.find(project => project.id === id);

const selectWeek = (allocations, week) => allocations.find(allocation => allocation.week === week);

const computeTotalAllocations = projects => {
  let totalAllocations = [];
  const startWeek = Math.min(...projects[0].allocations.map(allocation => allocation.week));
  const endWeek = Math.max(...projects[0].allocations.map(allocation => allocation.week));
  for (let week = startWeek; week <= endWeek; week++) {
    const percentages = projects.map(project => selectWeek(project.allocations, week)).map(week => week.percentage);
    const percentage = percentages.reduce((sum, percentage) => sum + percentage, 0);
    totalAllocations.push({
      week,
      percentage
    });
  }
  return totalAllocations;
}

export default {
  name: 'app',
  components: {
    UserRow
  },
  data() {
    return {
      users
    }
  },
  methods: {
    onSetAllocation({ userId, projectId, startWeek, endWeek, percentage }) {
      const user = selectUser(users, userId);
      const project = selectProject(user.projects, projectId);

      for (let week = startWeek; week <= endWeek; week++) {
        selectWeek(project.allocations, week).percentage = percentage;
      };
      user.totalAllocations = computeTotalAllocations(user.projects);
    }
  }
}
</script>

<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css);
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";

html {
  font-size: 62.5%;
}

body {
  font-size: 1.5rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1400px;
  margin: 50px auto;
  padding: 0 16px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
