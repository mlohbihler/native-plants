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
  lightRequirement: LightRequirement[]
  moisture: Moisture[]
  soils: Soils
  media: Media
  relatedContent: RelatedContent[]
  sources?: string[]
}

export type FgcaCommonality = {
  ecoRegion: EcoArea // Indicates an entire region, e.g. 6E
  ecoDistrict: EcoArea // Indicates a district within a region, e.g. 6E-7
}
export type EcoArea = {
  code: string
  commonality: Commonality
}
type Commonality = CommonalityCode | CountyCommonality
export type CommonalityCode = 'C' | 'U' | 'R' // Common, uncommon, rare
export type CountyCommonalityCode = CommonalityCode | 'X' // Common, uncommon, rare
export type CountyCommonality = {
  [key in CountyCommonalityCode]: County[]
}
export type County = number

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

type LightRequirement = 'shade' | 'partial' | 'sun'
type Moisture = 'dry' | 'medium' | 'wet'
type Soils = {
  granularity: SoilGranularity[]
  organic: boolean
}
type SoilGranularity = 'sandy loam' | 'loam' | 'clay loam'

type Media = {
  hero?: string
  images: string[]
}

type RelatedContent = {
  description?: string
  type: 'image' | 'link'
  url: string
}

type LengthUnit = 'ft' | 'm'
