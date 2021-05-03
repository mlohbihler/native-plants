<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <div class="search">
      <b>Search</b>
      <div><input type="text" v-model="search" /></div>
    </div>
    <div><ToggleSet label="Shade Tolerance" v-model="shadeTolerance" /></div>
    <div><ToggleSet label="Drainage" v-model="drainage" /></div>
    <div v-for="plant in plants.plants" :key="`${plant.genus}|${plant.specificEpithet}`">
      <router-link to="/about">
        {{ plant.commonNames[0] }} ({{ plant.genus }} {{ plant.specificEpithet }})
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import plants from '../data/plants.json'

import ToggleSet from '@/components/ToggleSet.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: { ToggleSet },
  data() {
    return {
      plants,

      search: 'solidago',
      shadeTolerance: [
        { id: 'fullSun', value: false, label: 'Full Sun' },
        { id: 'partialSun', value: false, label: 'Partial Sun' },
        { id: 'shade', value: false, label: 'Shade' },
      ],
      drainage: [
        { id: 'dry', value: false, label: 'Dry' },
        { id: 'medium', value: false, label: 'Medium' },
        { id: 'wet', value: false, label: 'Wet' },
      ],
    }
  },
  props: {
    msg: String,
  },
  watch: {
    search() {
      this.doSearch()
    },
    shadeTolerance() {
      this.doSearch()
    },
    drainage() {
      this.doSearch()
    },
  },
  methods: {
    doSearch() {
      console.log('search')
    },
  },
})
</script>

<style scoped lang="scss">
.search {
  padding-bottom: 10px;

  input {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    border: 2px solid rgba(139, 139, 139, 0.3);
    border-radius: 5px;
    transition: all 0.2s;
    padding: 8px 12px;
    outline: none;
    width: 300px;
    margin: 5px;

    &:focus {
      border-color: #085718;
    }
  }
}
a {
  color: #42b983;
}
</style>
