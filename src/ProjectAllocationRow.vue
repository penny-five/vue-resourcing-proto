<template>
  <div class="project-allocation-row">
    <span class="project__name">{{ project.name }}</span>
    <div class="allocations-wrapper">
      <AllocationBlock :allocation="allocation"
        :allocable="!selected"
        :key="allocation.week"
        :selected="isSelected(index)"
        :onMouseDown="() => onMouseDown(allocation, index)"
        :onMouseOver="() => onMouseOver(allocation, index)"
        v-for="(allocation, index) in visibleAllocations" />
      <AllocationSelector class="allocation-selector"
        @close="onDisbandAllocationSelector"
        @select="onSelectAllocation"
        v-if="selected"
        :style="{ left: `${Math.min(selectionStartIndex, selectionEndIndex) * 40}px` }" />
    </div>
  
  </div>
</template>

<script>
import AllocationBlock from "./AllocationBlock.vue";
import AllocationSelector from "./AllocationSelector.vue";

const isBetweenInclusive = (value, first, second) => {
  if (first > second) {
    return value >= second && value <= first;
  }
  return value >= first && value <= second;
}

export default {
  components: {
    AllocationBlock,
    AllocationSelector
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectionStartIndex: null,
    selectionEndIndex: null,
    selected: false
  }),
  computed: {
    visibleAllocations() {
      return this.project.allocations.slice(0, 5 * 6);
    }
  },
  methods: {
    isSelected(index) {
      if (this.selectionStartIndex == null) return false;
      return isBetweenInclusive(index, this.selectionStartIndex, this.selectionEndIndex);
    },
    onMouseDown(allocation, index) {
      this.selectionStartIndex = index;
      this.selectionEndIndex = index;

      const onMouseUp = () => {
        this.selected = true;
        window.removeEventListener('mouseup', onMouseUp);
      }
      window.addEventListener('mouseup', onMouseUp);
    },
    onMouseOver(allocation, index) {
      if (this.selectionStartIndex != null) {
        this.selectionEndIndex = index
      }
    },
    onDisbandAllocationSelector() {
      this.selectionStartIndex = null;
      this.selectionEndIndex = null;
      this.selected = false;
    },
    onSelectAllocation(percentage) {
      const startWeek = this.project.allocations[this.selectionStartIndex].week;
      const endWeek = this.project.allocations[this.selectionEndIndex].week;
      this.$emit('setAllocation', {
        projectId: this.project.id,
        startWeek,
        endWeek,
        percentage
      });
      this.selectionStartIndex = null;
      this.selectionEndIndex = null;
      this.selected = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.project-allocation-row {
  position: relative;
  height: 40px;
  margin-bottom: 4px;

  .project__name {
    display: block;
    float: left;
    width: 200px;
    padding-right: 16px;
    line-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .allocations-wrapper {
    display: flex;
    position: relative;
    border: 1px solid #e4e4e4;
    box-shadow: -1px 3px 3px 0px #929292;
  }

  .allocation-selector {
    position: absolute;
    top: 45px;
  }
}
</style>
