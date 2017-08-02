<template>
  <div class="allocation-selector"
    v-on-clickaway="onClickaway">
    <div class="allocation-selector__option"
      v-for="n in 12"
      :key="n"
      @click="onSelect((n - 1) * 10)">
      {{ (n - 1) * 10 }}
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  methods: {
    onClickaway() {
      this.$emit("close");
    },
    onSelect(value) {
      this.$emit("select", value);
    }
  }
}
</script>

<style lang="scss" scoped>
.allocation-selector {
  z-index: 100;
  background-color: white;
  border: 1px solid grey;
  width: 6 * 40px;

  .allocation-selector__option {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;

    &:hover {
      background-color: #def0f9;
    }
  }
}
</style>

