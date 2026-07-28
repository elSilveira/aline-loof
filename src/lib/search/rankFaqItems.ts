import type { FaqItem } from "./filterFaqItems";
import { normalizeText } from "./normalizeText";

function calculateRelevance(item: FaqItem, normalizedQuery: string): number {
  const question = normalizeText(item.question);
  const answer = normalizeText(item.answer);

  if (question === normalizedQuery) {
    return 4;
  }

  if (question.startsWith(normalizedQuery)) {
    return 3;
  }

  if (question.includes(normalizedQuery)) {
    return 2;
  }

  if (answer.includes(normalizedQuery)) {
    return 1;
  }

  return 0;
}

/**
 * Ordena itens de FAQ por relevância sem modificar o array original.
 *
 * A filtragem continua sendo responsabilidade de `filterFaqItems`; itens que
 * não correspondem à busca permanecem no fim caso sejam fornecidos.
 */
export function rankFaqItems<T extends FaqItem>(
  items: readonly T[],
  query: string,
): T[] {
  if (query.trim() === "") {
    return [...items];
  }

  const normalizedQuery = normalizeText(query);

  return items
    .map((item, originalIndex) => ({
      item,
      originalIndex,
      relevance: calculateRelevance(item, normalizedQuery),
    }))
    .sort(
      (first, second) =>
        second.relevance - first.relevance ||
        first.originalIndex - second.originalIndex,
    )
    .map(({ item }) => item);
}
