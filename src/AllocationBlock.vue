<script>

const allocationLevel = (allocation) => {
  if (allocation.percentage <= 30) return 'low';
  if (allocation.percentage <= 70) return 'medium';
  if (allocation.percentage <= 100) return 'high';
  return 'too-high';
}

const classes = props => ({
  'allocation-block': true,
  [`allocation-block--${allocationLevel(props.allocation)}`]: true,
  'allocation-block--background': props.drawBackground,
  'allocation-block--allocable': props.allocable,
  'allocation-block--selected': props.selected
});

export default {
  functional: true,
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
    },
    onMouseOver: {
      type: Function,
      required: false
    },
    onMouseDown: {
      type: Function,
      required: false
    }
  },
  render(h, context) {
    const { props } = context;

    const onMouseOver = () => {
      if (props.allocable && props.onMouseOver) {
        props.onMouseOver();
      }
    };

    const onMouseDown = () => {
      if (props.allocable && props.onMouseDown) {
        props.onMouseDown();
      }
    }
    return (
      <div class={classes(props)} onMouseover={onMouseOver} onMousedown={onMouseDown}>
        <span class="percentage">{props.allocation.percentage}</span>
        {(props.allocable || props.selected) &&
          <div class="allocation-selection">
            <i class="fa fa-plus"
              aria-hidden="true" />
          </div>
        }
      </div>
    );
  }
}
</script>

<style lang="scss">
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

  .allocation-selection {
    display: none;
    position: absolute;
    top: 4px;
    right: 2px;
    bottom: 4px;
    left: 2px;
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
      line-height: 32px;
      vertical-align: middle;
    }
  }

  &--selected {
    .percentage {
      display: none;
    }
    .allocation-selection {
      display: block;
    }
  }

  &--allocable:hover {
    .percentage {
      display: none;
    }
    .allocation-selection {
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

