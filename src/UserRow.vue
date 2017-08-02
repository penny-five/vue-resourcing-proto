<template>
  <div class="user">
    <TotalAllocationRow :user="user"
      :is-expanded="isExpanded"
      @toggle="onToggleExpanded" />
    <template v-if="isExpanded">
      <ProjectAllocationRow :key="project.id"
        :project="project"
        @selectRange="onSelectRange"
        @setAllocation="onSetAllocation"
        v-for="project in user.projects" />
    </template>
  </div>
</template>

<script>
import TotalAllocationRow from "./TotalAllocationRow.vue";
import ProjectAllocationRow from "./ProjectAllocationRow.vue";

export default {
  components: {
    TotalAllocationRow,
    ProjectAllocationRow
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isExpanded: false
  }),
  computed: {
    visibleTotalAllocations() {
      return this.user.totalAllocations.slice(0, 5 * 6);
    },
    toggleClasses() {
      return {
        'fa': true,
        'fa-caret-down': !this.isExpanded,
        'fa-caret-up': this.isExpanded
      }
    }
  },
  methods: {
    onToggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    onSelectRange(project, startIndex, endIndex) {
      this.selection = {
        project,
        startIndex,
        endIndex
      };
    },
    onSetAllocation({ projectId, startWeek, endWeek, percentage }) {
      this.$emit('setAllocation', {
        userId: this.user.id,
        projectId,
        startWeek: Math.min(startWeek, endWeek),
        endWeek: Math.max(startWeek, endWeek),
        percentage
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-info {
  display: flex;

  height: 40px;

  margin-bottom: 4px;

  .user__profile {
    width: 200px;
    padding: 2px 16px 0 0;

    .fa {
      float: right;
      font-size: 20px;
      width: 30px;
      line-height: 40px;
      text-align: center;
      vertical-align: middle;

      &:hover {
        background-color: #def0f9;
      }
    }
  }

  .user__name {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .user__title {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.3rem;
  }
}
</style>

