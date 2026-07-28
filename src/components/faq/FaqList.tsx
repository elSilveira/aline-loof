"use client";

import { useMemo, useState } from "react";

import { splitHighlightedText } from "../../lib/search/splitHighlightedText";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItem[];
  searchLabel: string;
  searchPlaceholder: string;
  rankLabel: string;
  noResultsMessage: string;
};

function normalizeText(text: string): string {
  return text
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getRelevance(item: FaqItem, query: string): number {
  const question = normalizeText(item.question);
  const answer = normalizeText(item.answer);

  if (question === query) {
    return 4;
  }

  if (question.startsWith(query)) {
    return 3;
  }

  if (question.includes(query)) {
    return 2;
  }

  if (answer.includes(query)) {
    return 1;
  }

  return 0;
}

export function searchAndRankFaqItems<T extends FaqItem>(
  items: readonly T[],
  query: string,
): T[] {
  const normalizedQuery = normalizeText(query);

  if (normalizedQuery === "") {
    return [...items];
  }

  return items
    .map((item, originalIndex) => ({
      item,
      originalIndex,
      relevance: getRelevance(item, normalizedQuery),
    }))
    .filter(({ relevance }) => relevance > 0)
    .sort(
      (first, second) =>
        second.relevance - first.relevance ||
        first.originalIndex - second.originalIndex,
    )
    .map(({ item }) => item);
}

export function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  return splitHighlightedText(text, query).map((part, index) =>
    part.highlighted ? (
      <mark
        key={`${part.text}-${index}`}
        className="bg-[#E7D7A5] text-inherit"
      >
        {part.text}
      </mark>
    ) : (
      <span key={`${part.text}-${index}`}>{part.text}</span>
    ),
  );
}

export default function FaqList({
  items,
  searchLabel,
  searchPlaceholder,
  rankLabel,
  noResultsMessage,
}: FaqListProps) {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim() !== "";
  const rankedItems = useMemo(
    () => searchAndRankFaqItems(items, query),
    [items, query],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <label
          htmlFor="faq-search"
          className="mb-3 block text-[11px] uppercase tracking-[0.18em] text-[#6B6560]"
        >
          {searchLabel}
        </label>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="min-w-0 border border-[#D4C9A8] bg-[#FDFAF4] px-5 py-4 text-[#1C1C1C] outline-none transition-colors placeholder:text-[#9A9288] focus:border-[#B8942A]"
          />

          <div
            className="flex min-w-28 flex-col items-center justify-center border-2 border-[#B8942A] bg-[#1C1C1C] px-4 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#C8B99A]">
              {rankLabel}
            </span>
            <strong className="font-serif text-xl font-medium text-[#B8942A]">
              {rankedItems.length}
            </strong>
          </div>
        </div>
      </div>

      {rankedItems.length > 0 ? (
        <div className="space-y-4">
          {rankedItems.map((item, index) => (
            <details
              key={item.question}
              className="group border border-[#D4C9A8] bg-[#FDFAF4] open:border-[#B8942A]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 font-serif text-lg text-[#1C1C1C]">
                <span className="flex min-w-0 items-center gap-3">
                  {hasQuery && (
                    <span className="shrink-0 font-sans text-[10px] tracking-[0.12em] text-[#B8942A]">
                      #{index + 1}
                    </span>
                  )}
                  <span>
                    <HighlightedText text={item.question} query={query} />
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl text-[#B8942A] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-[#6B6560]">
                <HighlightedText text={item.answer} query={query} />
              </p>
            </details>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-[#6B6560]" role="status">
          {noResultsMessage}
        </p>
      )}
    </div>
  );
}
