<template>
  <div class="total-allocation-row">
    <div class="user__profile">
      <i :class="toggleClasses"
        aria-hidden="true"
        @click="onToggleExpanded"></i>
      <img class="user__avatar"
        :src="user.avatar" />
      <span class="user__name">{{ user.name }}</span>
      <span class="user__title">{{ user.title }}</span>
    </div>
    <AllocationBlock :draw-background="true"
      :allocation="allocation"
      :key="allocation.week"
      v-for="allocation in visibleTotalAllocations" />
  </div>
</template>

<script>
import AllocationBlock from "./AllocationBlock.vue";

export default {
  components: {
    AllocationBlock
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    isExpanded: {
      type: Boolean,
      required: true
    }
  },
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
      this.$emit('toggle');
    }
  }
}
</script>

<style lang="scss" scoped>
.total-allocation-row {
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

  .user__avatar {
    float: left;
    margin: 6px 6px 0 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
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
