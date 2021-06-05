<template>
  <div class="search">
    <div class="search">
      <b>Keywords</b>
      <div><input type="text" v-model="keywords" /></div>
    </div>
    <div>
      <ToggleSet
        label="Shade Tolerance"
        :selection="shadeTolerance"
        :options="[
          { id: 'intolerant', label: 'Full Sun' },
          { id: 'intermediate', label: 'Partial Sun' },
          { id: 'tolerant', label: 'Shade' },
        ]"
        @onChange="onShadeToleranceChange"
      />
    </div>
    <div>
      <ToggleSet
        label="Drainage"
        :selection="drainage"
        :options="[
          { id: 'dry', value: false, label: 'Dry' },
          { id: 'medium', value: false, label: 'Medium' },
          { id: 'wet', value: false, label: 'Wet' },
        ]"
        @onChange="onDrainageChange"
      />
    </div>
    <div>
      <RadioSet
        label="Growth Habit"
        :selected="growthHabit"
        :options="[
          { id: 'forb', label: 'Forb' },
          { id: 'shrub', label: 'Shrub' },
          { id: 'subshrub', label: 'Subshrub' },
          { id: 'tree', label: 'Tree' },
          { id: 'vine', label: 'Vine' },
          { id: 'graminoid', label: 'Graminoid' },
          { id: 'lichenous', label: 'Lichenous' },
          { id: 'nonvascular', label: 'Nonvascular' },
        ]"
        @onChange="onGrowthHabitChange"
      />
    </div>
    <div>
      <ToggleSet
        label="Bloom Time"
        :selection="bloomTime"
        :options="[
          { id: 'jan', label: 'J' },
          { id: 'feb', label: 'F' },
          { id: 'mar', label: 'M' },
          { id: 'apr', label: 'A' },
          { id: 'may', label: 'M' },
          { id: 'jun', label: 'J' },
          { id: 'jul', label: 'J' },
          { id: 'aug', label: 'A' },
          { id: 'sep', label: 'S' },
          { id: 'oct', label: 'O' },
          { id: 'nov', label: 'N' },
          { id: 'dec', label: 'D' },
        ]"
        @onChange="onBloomTimeChange"
      />
    </div>
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
import RadioSet from '@/components/RadioSet.vue'
import ToggleSet from '@/components/ToggleSet.vue'
import { haveIntersection } from '@/util/util'

export default defineComponent({
  name: 'Search',
  components: { RadioSet, ToggleSet },
  data() {
    return {
      store: useStore(),
      keywords: useStore().state.searchKeywords,
      // TODO: move these into store.state
      shadeTolerance: [] as string[],
      drainage: [] as string[],
      growthHabit: null as string | null,
      bloomTime: [] as string[],
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
  },
  methods: {
    onShadeToleranceChange(values: string[]) {
      this.shadeTolerance = values
      this.doSearch()
    },
    onDrainageChange(values: string[]) {
      this.drainage = values
      this.doSearch()
    },
    onGrowthHabitChange(value: string) {
      this.growthHabit = value
      this.doSearch()
    },
    onBloomTimeChange(values: string[]) {
      this.bloomTime = values
      this.doSearch()
    },
    doSearch() {
      const keywords = this.keywords.trim()

      if (
        !keywords &&
        !this.shadeTolerance.length &&
        !this.drainage.length &&
        !this.growthHabit &&
        !this.bloomTime.length
      ) {
        this.store.commit('updateSearchResults', [])
        return
      }

      this.store.commit(
        'updateSearchResults',
        this.store.state.plantDatabase.plants
          .flatMap((plant) => {
            if (
              this.shadeTolerance.length &&
              !haveIntersection(this.shadeTolerance, plant.shadeTolerance)
            ) {
              return []
            }
            if (this.drainage.length && !haveIntersection(this.drainage, plant.moisture)) {
              return []
            }
            if (this.growthHabit && this.growthHabit !== plant.growthHabit) {
              return []
            }
            // if (bloomTime.length && !haveIntersection(drainage, plant.moisture)) {
            //   return []
            // }

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
