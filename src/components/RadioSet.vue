<template>
  <label>{{ label }}</label>
  <div class="radio-set">
    <div class="radio-item" v-for="radio in options" :key="radio.id">
      <ToggleItem
        :id="radio.id"
        :label="radio.label"
        :on="radio.id === selected"
        @onToggle="onToggle(radio.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ToggleItem from '@/components/ToggleItem.vue'

type RadioInput = {
  id: string
  label: string
}

export default defineComponent({
  name: 'RadioSet',
  components: { ToggleItem },
  props: {
    label: String,
    selected: String, // The id of the selected option, or null.
    options: {
      type: Object as () => Array<RadioInput>,
      required: true,
    },
  },
  emits: ['onChange'],
  methods: {
    onToggle(id: string) {
      this.$emit('onChange', id === this.selected ? null : id)
    },
  },
})
</script>

<style scoped lang="scss">
label {
  font-weight: bold;
}
.radio-set {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  padding: 10px 0;
}
.radio-item {
  margin: 0 5px 5px 0;
}
</style>
