<template>
  <div :class="{ toggle: true, on: modelValue }" @click="onClick()">{{ label }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toggle',
  props: {
    label: String,
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
  methods: {
    onClick() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
})
</script>

<style scoped lang="scss">
.toggle {
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #666;
  border-radius: 5px;
  white-space: nowrap;
  transition: all 0.2s;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  display: inline-block;

  &:hover {
    border-color: #15a532;
  }

  &.on {
    border-color: #085718;
    background-color: #085718;
    color: #fff;
  }
}
</style>
