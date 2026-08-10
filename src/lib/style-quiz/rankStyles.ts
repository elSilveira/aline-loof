import {
  STYLE_TIE_BREAK_ORDER,
  type StyleId,
  type StyleScores,
} from "./types";

export { STYLE_TIE_BREAK_ORDER } from "./types";
export type { StyleId, StyleScores } from "./types";

/** Um estilo organizado para exibição no resultado. */
export type RankedStyle = {
  styleId: StyleId;
  points: number;
  position: number;
  percentage: number;
};

type StyleWithPoints = Pick<RankedStyle, "styleId" | "points">;

/**
 * Ordena os estilos por pontos, aplica o desempate fixo e calcula percentuais.
 * O mapa recebido é somente lido e nunca é modificado.
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
