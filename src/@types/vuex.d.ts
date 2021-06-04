// import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { PlantDatabase } from './plants'

declare module '@vue/runtime-core' {
  // interface State {
  //   plantsDatabase: PlantDatabase
  // }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
