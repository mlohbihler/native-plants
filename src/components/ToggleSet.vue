<template>
  <label>{{ label }}</label>
  <div class="toggle-set">
    <div class="toggle-item" v-for="toggle in options" :key="toggle.id">
      <ToggleItem
        :id="toggle.id"
        :label="toggle.label"
        :on="selection.includes(toggle.id)"
        @onToggle="onToggle(toggle.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ToggleItem from '@/components/ToggleItem.vue'

type ToggleInput = {
  id: string
  label: string
}

export default defineComponent({
  name: 'ToggleSet',
  components: { ToggleItem },
  props: {
    label: String,
    selection: {
      type: Object as () => Array<string>,
      required: true,
    },
    options: {
      type: Object as () => Array<ToggleInput>,
      required: true,
    },
  },
  emits: ['onChange'],
  methods: {
    onToggle(id: string) {
      const filtered = this.selection.filter((e) => e !== id)
      const newValue = filtered.length === this.selection.length ? [...filtered, id] : filtered
      this.$emit('onChange', newValue)
    },
  },
})
</script>

<style scoped lang="scss">
label {
  font-weight: bold;
}
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
