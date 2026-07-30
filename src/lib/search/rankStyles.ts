/**
 * Lista todos os estilos e define a ordem usada quando houver empate.
 */
export const STYLE_TIE_BREAK_ORDER = [
  "tradicional",
  "elegante",
  "esportivo",
  "romantico",
  "criativo",
  "dramatico",
] as const;

/** Um dos seis estilos disponíveis. */
export type StyleId = (typeof STYLE_TIE_BREAK_ORDER)[number];

/** Pontuação obrigatória para cada estilo. */
export type StyleScores = Record<StyleId, number>;

/** Um estilo já organizado para ser exibido no resultado. */
export type RankedStyle = {
  styleId: StyleId;
  points: number;
  position: number;
  percentage: number;
};

type StyleWithPoints = Pick<RankedStyle, "styleId" | "points">;

/**
 * Ordena os estilos por pontuação sem modificar o objeto recebido.
 *
 * Empates respeitam STYLE_TIE_BREAK_ORDER e compartilham a mesma posição.
 * O percentual não é arredondado para preservar a precisão do cálculo.
 */
export function rankStyles(
  scores: Readonly<StyleScores>,
  limit: number = STYLE_TIE_BREAK_ORDER.length,
): RankedStyle[] {
  const totalPoints = STYLE_TIE_BREAK_ORDER.reduce(
    (total, styleId) => total + scores[styleId],
    0,
  );

  const sortedStyles = STYLE_TIE_BREAK_ORDER.map<StyleWithPoints>(
    (styleId) => ({
      styleId,
      points: scores[styleId],
    }),
  ).sort((firstStyle, secondStyle) => {
    if (firstStyle.points !== secondStyle.points) {
      return secondStyle.points - firstStyle.points;
    }

    return (
      STYLE_TIE_BREAK_ORDER.indexOf(firstStyle.styleId) -
      STYLE_TIE_BREAK_ORDER.indexOf(secondStyle.styleId)
    );
  });

  let previousPoints: number | undefined;
  let previousPosition = 0;

  const rankedStyles = sortedStyles.map<RankedStyle>((style, index) => {
    const hasSamePointsAsPrevious = previousPoints === style.points;
    const position = hasSamePointsAsPrevious
      ? previousPosition
      : index + 1;

    previousPoints = style.points;
    previousPosition = position;

    return {
      ...style,
      position,
      percentage:
        totalPoints === 0 ? 0 : (style.points / totalPoints) * 100,
    };
  });

  const safeLimit = Math.max(0, Math.floor(limit));

  return rankedStyles.slice(0, safeLimit);
}
