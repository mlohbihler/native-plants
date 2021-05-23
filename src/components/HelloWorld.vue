<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <div class="search">
      <b>Keywords</b>
      <div><input type="text" v-model="keywords" /></div>
    </div>
    <div><ToggleSet label="Shade Tolerance" v-model="shadeTolerance" /></div>
    <div><ToggleSet label="Drainage" v-model="drainage" /></div>
    <div v-for="result in searchResult" :key="`${result.plant.genus}|${result.plant.species}`">
      <router-link to="/about">
        {{ result.plant.commonNames[0] }} ({{ result.plant.genus }} {{ result.plant.species }}) [{{
          result.ranking.toPrecision(2)
        }}]
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import importedPlants from '../data/plants.json'
import { diceCoefficient as stringComparator } from 'string-comparison'
import ToggleSet from '@/components/ToggleSet.vue'
import { PlantDatabase, Plant } from '@/@types/string-comparison/plants'

const plantsDatabase = importedPlants as PlantDatabase
const MIN_RANKING = 0.1

type SearchResult = {
  plant: Plant
  ranking: number
}

export default defineComponent({
  name: 'HelloWorld',
  components: { ToggleSet },
  data() {
    return {
      plantsDatabase,
      searchResult: [] as SearchResult[],

      keywords: '',
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
    keywords() {
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
      if (!this.keywords.trim()) {
        this.searchResult = []
        return
      }

      this.searchResult = this.plantsDatabase.plants
        .flatMap((plant) => {
          const content = [plant.genus, plant.species, ...plant.commonNames].join(' ')
          const ranking = stringComparator.similarity(this.keywords, content)
          return ranking >= MIN_RANKING ? [{ plant, ranking }] : []
        })
        .sort((a, b) => b.ranking - a.ranking)
        .slice(0, 20)
      // .map((ranking) => ranking.plant)
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
