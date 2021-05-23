export type PlantDatabase = {
  version: string
  metadata: { [key: string]: string }
  plants: Plant[]
}

export type Plant = {
  genus: string
  species: string
  commonNames: string[]
  usdaCode?: string
  fgcaCommonality?: FgcaCommonality[]
  growthHabit:
    | 'forb'
    | 'graminoid'
    | 'lichenous'
    | 'nonvascular'
    | 'shrub'
    | 'subshrub'
    | 'tree'
    | 'vine'
  leafRetention?: boolean
  hardinessZone?: HardinessZoneRange
  matureSize: MatureSize
  duration?: 'annual' | 'biennial' | 'perennial'
  shadeTolerance: ShadeTolerance[]
  moisture: Moisture[]
  soils: Soils
  media: Media
  relatedContent: RelatedContent[]
  sources?: string[]
}

type FgcaCommonality = {
  ecoRegion: {
    code: string // Indicates an entire region, e.g. 6E
    commonality: Commonality
  }
  ecoDistrict: {
    code: string // Indicates a district within a region, e.g. 6E-7
    commonality: Commonality
  }
}

type Commonality = CommonalityCode | CountyCommonality
type CommonalityCode = 'C' | 'U' | 'R' // Common, uncommon, rare
type CountyCommonality = {
  C: County[]
  U: County[]
  R: County[]
  X: County[] // Except
}
type County = number

type HardinessZoneRange = {
  min: HardinessZone
  max: HardinessZone
}
type HardinessZone =
  | '1a'
  | '1b'
  | '2a'
  | '2b'
  | '3a'
  | '3b'
  | '4a'
  | '4b'
  | '5a'
  | '5b'
  | '6a'
  | '6b'
  | '7a'
  | '7b'
  | '8a'
  | '8b'
  | '9a'
  | '9b'
  | '10a'
  | '10b'
  | '11a'
  | '11b'
  | '12a'
  | '12b'
  | '13a'
  | '13b'

type MatureSize = {
  unit: LengthUnit
  height: number
}

type ShadeTolerance = 'tolerant' | 'intermediate' | 'intolerant'
type Moisture = 'dry' | 'medium' | 'wet'
type Soils = {
  granularity: SoilGranularity[]
  organic: boolean
}
type SoilGranularity = 'sandy loam' | 'loam' | 'clay loam'

type Media = {
  images: string[]
}

type RelatedContent = {
  description?: string
  type: 'image' | 'link'
  url: string
}

type LengthUnit = 'ft' | 'm'
