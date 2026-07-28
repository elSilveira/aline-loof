export type HighlightedTextPart = {
  text: string;
  highlighted: boolean;
};

type SearchIndex = {
  normalizedText: string;
  originalStarts: number[];
  originalEnds: number[];
};

function normalizeCharacter(character: string): string {
  return character
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function createSearchIndex(text: string): SearchIndex {
  let normalizedText = "";
  const originalStarts: number[] = [];
  const originalEnds: number[] = [];

  for (let index = 0; index < text.length; ) {
    const codePoint = text.codePointAt(index);

    if (codePoint === undefined) {
      break;
    }

    const character = String.fromCodePoint(codePoint);
    const normalizedCharacter = normalizeCharacter(character);
    const originalEnd = index + character.length;

    for (const normalizedPart of normalizedCharacter) {
      normalizedText += normalizedPart;
      originalStarts.push(index);
      originalEnds.push(originalEnd);
    }

    index = originalEnd;
  }

  return { normalizedText, originalStarts, originalEnds };
}

/**
 * Divide um texto em partes destacadas e comuns sem alterar sua escrita.
 * A comparação ignora maiúsculas, minúsculas e acentos.
 */
export function splitHighlightedText(
  text: string,
  query: string,
): HighlightedTextPart[] {
  const normalizedQuery = normalizeCharacter(query.trim());

  if (text === "" || normalizedQuery === "") {
    return [{ text, highlighted: false }];
  }

  const { normalizedText, originalStarts, originalEnds } =
    createSearchIndex(text);
  const matches: Array<{ start: number; end: number }> = [];
  let searchFrom = 0;

  while (searchFrom < normalizedText.length) {
    const matchIndex = normalizedText.indexOf(normalizedQuery, searchFrom);

    if (matchIndex === -1) {
      break;
    }

    const matchEndIndex = matchIndex + normalizedQuery.length - 1;
    matches.push({
      start: originalStarts[matchIndex],
      end: originalEnds[matchEndIndex],
    });
    searchFrom = matchIndex + normalizedQuery.length;
  }

  if (matches.length === 0) {
    return [{ text, highlighted: false }];
  }

  const parts: HighlightedTextPart[] = [];
  let originalPosition = 0;

  for (const match of matches) {
    if (match.start > originalPosition) {
      parts.push({
        text: text.slice(originalPosition, match.start),
        highlighted: false,
      });
    }

    parts.push({
      text: text.slice(match.start, match.end),
      highlighted: true,
    });
    originalPosition = match.end;
  }

  if (originalPosition < text.length) {
    parts.push({
      text: text.slice(originalPosition),
      highlighted: false,
    });
  }

  return parts;
}
