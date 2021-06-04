<template>
  <b>{{ label }}</b>
  <div class="toggle-set">
    <div class="toggle-item" v-for="toggle in modelValue" :key="toggle.label">
      <Toggle
        :label="toggle.label"
        :model-value="toggle.value"
        @update:model-value="onToggle(toggle.label, $event)"
      />
    </div>
  </div>
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
        this.modelValue.map((e) => (e.label === label ? { ...e, label, value } : e)),
      )
    },
  },
})
</script>

<style scoped lang="scss">
.toggle-set {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  padding: 10px 0;
}
.toggle-item {
  margin: 0 5px 5px 0;
}
</style>
