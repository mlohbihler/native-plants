declare module 'string-comparison' {
  class Similarity {
    similarity: (thanos: string, rival: string) => number
  }

  class Cosine extends Similarity {}
  class DiceCoefficient extends Similarity {}
  class JaccardIndex extends Similarity {}
  class Levenshtein extends Similarity {}
  class LongestCommonSubsequence extends Similarity {}
  class MetricLCS extends Similarity {}

  export const cosine: Cosine
  export const diceCoefficient: DiceCoefficient
  export const jaccardIndex: JaccardIndex
  export const levenshtein: Levenshtein
  export const lcs: LongestCommonSubsequence
  export const mlcs: MetricLCS
}
