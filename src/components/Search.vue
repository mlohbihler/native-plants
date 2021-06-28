<template>
  <div class="search">
    <div class="search">
      <b>Keywords</b>
      <div><input type="text" v-model="keywords" /></div>
    </div>
    <div>
      <ToggleSet
        label="Light requirement"
        :selection="criteria.lightRequirement"
        :options="[
          { id: 'sun', label: 'Full Sun' },
          { id: 'partial', label: 'Partial Sun' },
          { id: 'shade', label: 'Shade' },
        ]"
        @onChange="onLightRequirementChange"
      />
    </div>
    <div>
      <ToggleSet
        label="Drainage"
        :selection="criteria.drainage"
        :options="[
          { id: 'dry', value: false, label: 'Dry' },
          { id: 'medium', value: false, label: 'Medium' },
          { id: 'wet', value: false, label: 'Wet' },
        ]"
        @onChange="onDrainageChange"
      />
    </div>
    <div>
      <ToggleSet
        label="Growth Habit"
        :selection="criteria.growthHabit"
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
        :selection="criteria.bloomTime"
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
      <router-link :to="`/plant/${result.plant.genus}/${result.plant.species}`">
        {{ result.plant.commonNames[0] }}
        <span class="scientifical">({{ result.plant.genus }} {{ result.plant.species }})</span>
      </router-link>
    </div>
    <div v-if="hiddenSearchResultCount > 0" class="hidden-results">
      {{ hiddenSearchResultCount }} matches not shown
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
      criteria: useStore().state.searchCriteria,
      keywords: useStore().state.searchCriteria.keywords,
    }
  },
  computed: {
    searchResults() {
      return useStore().state.searchResults
    },
    hiddenSearchResultCount() {
      return useStore().state.hiddenSearchResultCount
    },
  },
  watch: {
    keywords() {
      this.criteria.keywords = this.keywords
      this.doSearch()
    },
  },
  methods: {
    onLightRequirementChange(values: string[]) {
      this.criteria.lightRequirement = values
      this.doSearch()
    },
    onDrainageChange(values: string[]) {
      this.criteria.drainage = values
      this.doSearch()
    },
    onGrowthHabitChange(values: string[]) {
      this.criteria.growthHabit = values
      this.doSearch()
    },
    onBloomTimeChange(values: string[]) {
      this.criteria.bloomTime = values
      this.doSearch()
    },
    doSearch() {
      this.store.commit('updateSearchCriteria', this.criteria)

      const {
        keywords: untrimmedKeywords,
        lightRequirement,
        drainage,
        growthHabit,
        bloomTime,
      } = this.criteria
      const keywords = untrimmedKeywords.trim()

      if (
        !keywords &&
        !lightRequirement.length &&
        !drainage.length &&
        !growthHabit &&
        !bloomTime.length
      ) {
        this.store.commit('updateSearchResults', [])
        return
      }

      const selected = this.store.state.plantDatabase.plants
        .flatMap((plant) => {
          if (
            lightRequirement.length &&
            !haveIntersection(lightRequirement, plant.lightRequirement)
          ) {
            return []
          }
          if (drainage.length && !haveIntersection(drainage, plant.moisture)) {
            return []
          }
          if (growthHabit.length && !growthHabit.includes(plant.growthHabit)) {
            return []
          }
          // if (bloomTime.length && !haveIntersection(drainage, plant.moisture)) {
          //   return []
          // }

          let ranking = 0
          if (keywords) {
            const commonNames = plant.commonNames.map((name) => name.replace('-', ''))
            const searchContent = [plant.genus, plant.species, ...commonNames].join(' ')
            ranking = stringComparator.similarity(keywords, searchContent)
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
      this.store.commit('updateHiddenSearchResultCount', Math.max(0, selected.length - 10))
      this.store.commit('updateSearchResults', selected.slice(0, 10))
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

  .hidden-results {
    margin-top: 10px;
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
