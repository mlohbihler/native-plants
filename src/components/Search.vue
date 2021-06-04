<template>
  <div class="hello">
    <div class="search">
      <b>Keywords</b>
      <div><input type="text" v-model="keywords" /></div>
    </div>
    <div><ToggleSet label="Shade Tolerance" v-model="shadeTolerance" /></div>
    <div><ToggleSet label="Drainage" v-model="drainage" /></div>
    <div v-for="result in searchResults" :key="`${result.plant.genus}|${result.plant.species}`">
      <router-link to="/plant">
        {{ result.plant.commonNames[0] }}
        <span class="scientifical">({{ result.plant.genus }} {{ result.plant.species }})</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { diceCoefficient as stringComparator } from 'string-comparison'
import ToggleSet from '@/components/ToggleSet.vue'
import { haveIntersection } from '@/util/util'

export default defineComponent({
  name: 'Search',
  components: { ToggleSet },
  data() {
    return {
      store: useStore(),
      keywords: useStore().state.searchKeywords,
      // TODO: move these into store.state
      shadeTolerance: [
        { id: 'intolerant', value: false, label: 'Full Sun' },
        { id: 'intermediate', value: false, label: 'Partial Sun' },
        { id: 'tolerant', value: false, label: 'Shade' },
      ],
      drainage: [
        { id: 'dry', value: false, label: 'Dry' },
        { id: 'medium', value: false, label: 'Medium' },
        { id: 'wet', value: false, label: 'Wet' },
      ],
    }
  },
  computed: {
    searchResults() {
      return useStore().state.searchResults
    },
  },
  watch: {
    keywords() {
      this.store.commit('updateSearchKeywords', this.keywords)
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
      const keywords = this.keywords.trim()
      const shadeTolerance = this.shadeTolerance.filter((e) => e.value).map((e) => e.id)
      const drainage = this.drainage.filter((e) => e.value).map((e) => e.id)

      if (!keywords && !shadeTolerance.length && !drainage.length) {
        this.store.commit('updateSearchResults', [])
        return
      }

      this.store.commit(
        'updateSearchResults',
        this.store.state.plantDatabase.plants
          .flatMap((plant) => {
            if (shadeTolerance.length && !haveIntersection(shadeTolerance, plant.shadeTolerance)) {
              return []
            }
            if (drainage.length && !haveIntersection(drainage, plant.moisture)) {
              return []
            }

            let ranking = 0
            if (keywords) {
              const commonNames = plant.commonNames.map((name) => name.replace('-', ''))
              const searchContent = [plant.genus, plant.species, ...commonNames].join(' ')
              ranking = stringComparator.similarity(this.keywords, searchContent)
            }

            return [{ plant, ranking }]
          })
          .sort((a, b) => {
            if (keywords) {
              return b.ranking - a.ranking
            }
            return a.plant.commonNames[0].localeCompare(b.plant.commonNames[0], undefined, {
              sensitivity: 'base',
            })
          })
          .slice(0, 10),
      )
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
    box-sizing: border-box;
    padding: 8px 0 8px 12px;
    outline: none;
    width: 100%;
    margin: 5px 0;

    &:focus {
      border-color: #085718;
    }
  }
}
a {
  color: #eee;
  font-size: larger;

  .scientifical {
    color: #eee;
    font-style: italic;
  }
}
</style>
