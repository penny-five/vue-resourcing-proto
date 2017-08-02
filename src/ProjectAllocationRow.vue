<template>
  <div class="project-allocation-row">
    <span class="project__name">{{ project.name }}</span>
    <div class="allocations-wrapper"
      ref="wrapper">
      <AllocationBlock :allocation="allocation"
        :allocable="!selected"
        :key="allocation.week"
        :selected="isSelected(index)"
        :onMouseDown="event => onMouseDown(event, allocation, index)"
        v-for="(allocation, index) in visibleAllocations" />
      <AllocationSelector class="allocation-selector"
        @close="onDisbandAllocationSelector"
        @select="onSelectAllocation"
        v-if="selected"
        :style="computeAllocationSelectorStyle(this)" />
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

const NUM_WEEKS = 5 * 6;

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
      return this.project.allocations.slice(0, NUM_WEEKS);
    }
  },
  methods: {
    isSelected(index) {
      if (this.selectionStartIndex == null) return false;
      return isBetweenInclusive(index, this.selectionStartIndex, this.selectionEndIndex);
    },
    computeAllocationSelectorStyle() {
      const wrapperWidth = this.$refs.wrapper.offsetWidth;
      const allocationBlockWidth = wrapperWidth / NUM_WEEKS;
      if (this.selectionStartIndex > this.selectionEndIndex) {
        return { left: `${allocationBlockWidth * this.selectionEndIndex}px` };
      }
      return { right: `${(NUM_WEEKS - this.selectionEndIndex - 1) * allocationBlockWidth}px` };
    },
    onMouseDown(event, allocation, index) {
      event.preventDefault();

      this.selectionStartIndex = index;
      this.selectionEndIndex = index;

      const wrapperBoundingRect = this.$refs.wrapper.getBoundingClientRect();
      const wrapperLeft = wrapperBoundingRect.left;
      const wrapperWidth = wrapperBoundingRect.right - wrapperBoundingRect.left;
      const allocationBlockWidth = wrapperWidth / NUM_WEEKS;

      const onMouseMove = event => {
        const pos = Math.floor((event.screenX - wrapperLeft) / allocationBlockWidth);
        this.selectionEndIndex = Math.max(0, Math.min(pos, NUM_WEEKS - 1));
      }
      window.addEventListener('mousemove', onMouseMove);

      const onMouseUp = () => {
        this.selected = true;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }
      window.addEventListener('mouseup', onMouseUp);
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
