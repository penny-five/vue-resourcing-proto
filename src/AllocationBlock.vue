<template>
  <div :class="classes"
    @mouseover="onMouseOver"
    @mousedown="onMouseDown">
    <span class="percentage">{{ allocation.percentage }}</span>
    <div class="allocation-selector"
      v-if="allocable || selected">
      <i class="fa fa-plus"
        aria-hidden="true" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allocation: {
      type: Object,
      required: true
    },
    drawBackground: {
      type: Boolean,
      default: false
    },
    allocable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    allocationLevel() {
      if (this.allocation.percentage <= 30) return 'low';
      if (this.allocation.percentage <= 70) return 'medium';
      if (this.allocation.percentage <= 100) return 'high';
      return 'too-high';
    },
    classes() {
      return {
        'allocation-block': true,
        [`allocation-block--${this.allocationLevel}`]: true,
        'allocation-block--background': this.drawBackground,
        'allocation-block--allocable': this.allocable,
        'allocation-block--selected': this.selected
      };
    }
  },
  methods: {
    onMouseOver() {
      if (this.allocable) {
        this.$emit("mouseOver");
      }
    },
    onMouseDown() {
      if (this.allocable) {
        this.$emit("startDrag");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.allocation-block {
  position: relative;

  flex-grow: 1;
  flex-basis: 0;

  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  height: 40px;

  border-right: 1px solid #dde2e8;

  color: #30333a;

  .allocation-selector {
    display: none;
    position: absolute;
    top: 3px;
    right: 3px;
    bottom: 3px;
    left: 3px;
    border: 1px solid #dde2e8;
    border-radius: 5px;
    background-color: #f1f1f1;

    >.fa {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      font-size: 13px;
      line-height: 34px;
      vertical-align: middle;
    }
  }

  &--selected {
    .percentage {
      display: none;
    }
    .allocation-selector {
      display: block;
    }
  }

  &--allocable:hover {
    .percentage {
      display: none;
    }
    .allocation-selector {
      display: block;
    }
  }

  &--background {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0px;
      left: 0;
      background-color: #d4d9e2;
      z-index: -2;
    }
  }

  $levels: ( low: #ffeb97,
  medium: #b3eaae,
  high: #5fd7a8,
  too-high: #f77671);

  @each $name,
  $color in $levels {
    &.allocation-block--#{$name} {
      &:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: #{$color};
        border-radius: 5px;
        z-index: -1;
      }
    }
  }
}
</style>

