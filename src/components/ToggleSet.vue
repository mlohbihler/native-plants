<template>
  <b>{{ label }}</b>
  <ul>
    <li v-for="toggle in modelValue" :key="toggle.label">
      <Toggle
        :label="toggle.label"
        :model-value="toggle.value"
        @update:model-value="onToggle(toggle.label, $event)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Toggle from '@/components/Toggle.vue'

type ToggleInput = {
  label: string
  value: boolean
}

export default defineComponent({
  name: 'ToggleSet',
  components: { Toggle },
  props: {
    label: String,
    modelValue: {
      type: Object as () => Array<ToggleInput>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onToggle(label: string, value: boolean) {
      this.$emit(
        'update:modelValue',
        this.modelValue.map((e) => (e.label === label ? { label, value } : e))
      )
    },
  },
})
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 10px 0 20px 0;
  margin: 0;

  li {
    display: inline-block;
    padding: 5px;
    margin: 0px;
  }
}
</style>
