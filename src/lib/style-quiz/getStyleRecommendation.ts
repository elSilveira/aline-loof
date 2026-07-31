import type { RankedStyle } from "./rankStyles";

/** A recomendação corresponde ao estilo mais bem colocado no ranking. */
export type StyleRecommendation = RankedStyle;

/**
 * Retorna o primeiro estilo do ranking sem modificar o array nem seu item.
 * Um ranking vazio não possui recomendação e, por isso, devolve null.
 */
export function getStyleRecommendation(
  ranking: readonly RankedStyle[],
): StyleRecommendation | null {
  const firstStyle = ranking[0];

  return firstStyle ? { ...firstStyle } : null;
}
