<template>
  <!-- <div v-if="hero" id="hero"> -->
  <!-- <img alt="Hero" :src="hero" /> -->
  <!-- </div> -->
  <div class="plant">
    <h1>{{ plant.commonNames[0] }}</h1>
    <div class="scientifical">{{ plant.genus }} {{ plant.species }}</div>
    <div class="info" v-if="plant.commonNames.length > 1">
      <span>Other names</span>: {{ plant.commonNames.slice(1).join(', ') }}
    </div>
    <div class="info" v-if="plant.usdaCode"><span>USDA code</span>: {{ plant.usdaCode }}</div>
    <div class="info"><span>Growth habit</span>: {{ plant.growthHabit }}</div>
    <div class="info" v-if="plant.leafRetention">
      <span>Leaf retention</span>: {{ plant.leafRetention ? 'yes' : 'no' }}
    </div>
    <div class="info" v-if="plant.hardinessZone">
      <span>Hardiness zones</span>: {{ plant.hardinessZone.min }} to {{ plant.hardinessZone.max }}
    </div>
    <div class="info" v-if="plant.matureSize">
      <span>Hardiness zones</span>: {{ plant.matureSize.height }} {{ plant.matureSize.unit }}
    </div>
    <div class="info" v-if="plant.duration"><span>Lifecycle</span>: {{ plant.duration }}</div>
    <div class="info" v-if="plant.shadeTolerance">
      <span>Shade tolerance</span>: {{ plant.shadeTolerance.join(', ') }}
    </div>
    <div class="info" v-if="plant.moisture">
      <span>Moisture requirements</span>: {{ plant.moisture.join(', ') }}
    </div>
    <div class="info" v-if="plant.soils">
      <span>Soil granularity</span>: {{ plant.soils.granularity.join(', ') }}
    </div>
    <div class="info" v-if="plant.soils">
      <span>Organic soil</span>: {{ plant.soils.organic ? 'yes' : 'no' }}
    </div>
    <div class="info" v-if="plant.fgcaCommonality">
      <span>FGCA commonality</span>: {{ decodeFgcaCommonalities(plant.fgcaCommonality) }}
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import {
  County,
  CountyCommonality,
  CountyCommonalityCode,
  EcoArea,
  FgcaCommonality,
  Plant,
} from '@/@types/plants'

export default defineComponent({
  name: 'Plant',
  data() {
    return {
      store: useStore(),
      plant: undefined as undefined | Plant,
    }
  },
  beforeMount() {
    const { genus, species } = this.$route.params
    // Find the requested plant.
    this.plant = this.store.state.plantDatabase.plants.find(
      (plant) => plant.genus === genus || plant.species == species,
    )
    if (!this.plant) {
      this.$router.push({ name: '/' })
    }
  },
  computed: {
    // hero() {
    //   if (this.plant?.media.hero) {
    //     const hero = this.plant?.media.hero
    //     return require(`../assets/plantHeroes/${hero}`)
    //   }
    //   return undefined
    // },
  },
  methods: {
    decodeFgcaCommonalities(commonalities: FgcaCommonality[]): string {
      const description = commonalities
        .flatMap((fgcaCommonality) => {
          return `${this.decodeFgcaEcoArea(fgcaCommonality.ecoRegion)}, ${this.decodeFgcaEcoArea(
            fgcaCommonality.ecoDistrict,
          )}`
        })
        .join(', ')
      return `${description.charAt(0).toUpperCase()}${description.slice(1)}.`
    },
    decodeFgcaEcoArea(area: EcoArea): string {
      if (typeof area.commonality === 'string') {
        const code = this.expandCommonalityCode(area.commonality)
        return `${code} in ${area.code}`
      }

      const countyCommonality = area.commonality as CountyCommonality
      const counties = Object.keys(countyCommonality).map((key) => {
        const code = this.expandCommonalityCode(key)
        return `${code} in ${this.joinCounties(countyCommonality[key as CountyCommonalityCode])}`
      })
      return `${counties.join(', ')} of district ${area.code}`
    },
    expandCommonalityCode(commonality: string) {
      switch (commonality) {
        case 'C':
          return 'common'
        case 'U':
          return 'uncommon'
        case 'R':
          return 'rare'
        case 'X':
          return 'except'
      }
      return '???'
    },
    joinCounties(counties: County[]) {
      if (counties.length === 1) {
        return `county ${counties[0]}`
      }
      return `counties ${counties.slice(0, -1).join(', ')} and ${counties.slice(-1)}`
    },
  },
})
</script>

<style scoped lang="scss">
.plant {
  padding: 0 20px;

  h1 {
    margin-bottom: 5px;
  }
  .scientifical {
    font-style: italic;
    margin-bottom: 20px;
  }
  .info {
    margin-bottom: 10px;

    span {
      font-weight: 800;
      font-size: larger;
    }
  }
}
</style>
