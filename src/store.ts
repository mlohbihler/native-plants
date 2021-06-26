import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import importedPlants from './data/plants.json'
import { PlantDatabase, Plant } from '@/@types/plants'
// import { State } from '@/@types/vuex'

const plantDatabase = importedPlants as PlantDatabase

export type SearchResult = {
  plant: Plant
  ranking: number
}

export interface State {
  plantDatabase: PlantDatabase
  searchKeywords: string
  searchResults: SearchResult[]
  hiddenSearchResultCount: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    plantDatabase,
    searchKeywords: '',
    searchResults: [],
    hiddenSearchResultCount: 0,
  },
  getters: {},
  mutations: {
    updateSearchKeywords(state, keywords: string) {
      state.searchKeywords = keywords
    },
    updateSearchResults(state, results) {
      state.searchResults = results
    },
    updateHiddenSearchResultCount(state, count) {
      state.hiddenSearchResultCount = count
    },
  },
  actions: {},
  modules: {},
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
