import { normalizeText } from "./normalizeText";

export type FaqItem = {
  question: string;
  answer: string;
};

export function filterFaqItems<T extends FaqItem>(
  items: readonly T[],
  query: string,
): T[] {
  if (query.trim() === "") {
    return [...items];
  }

  const normalizedQuery = normalizeText(query);

  return items.filter(
    (item) =>
      normalizeText(item.question).includes(normalizedQuery) ||
      normalizeText(item.answer).includes(normalizedQuery),
  );
}
