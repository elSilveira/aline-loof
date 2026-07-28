"use client";

import { useState } from "react";

import {
  filterFaqItems,
  type FaqItem,
} from "@/lib/search/filterFaqItems";
import { rankFaqItems } from "@/lib/search/rankFaqItems";

type FaqListProps = {
  items: FaqItem[];
  searchLabel: string;
  searchPlaceholder: string;
  rankLabel: string;
  noResultsMessage: string;
};

export default function FaqList({
  items,
  searchLabel,
  searchPlaceholder,
  rankLabel,
  noResultsMessage,
}: FaqListProps) {
  const [query, setQuery] = useState("");
  const filteredItems = filterFaqItems(items, query);
  const rankedItems = rankFaqItems(filteredItems, query);
  const hasQuery = query.trim() !== "";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <label
          htmlFor="faq-search"
          className="block mb-3 text-[11px] tracking-[0.18em] uppercase text-[#6B6560]"
        >
          {searchLabel}
        </label>
        <div className="flex items-stretch gap-3">
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="min-w-0 flex-1 border border-[#D4C9A8] bg-[#FDFAF4] px-5 py-4 text-[#1C1C1C] outline-none transition-colors placeholder:text-[#9A9288] focus:border-[#B8942A]"
          />
          <div
            className="flex min-w-28 flex-col items-center justify-center border-2 border-[#B8942A] bg-[#1C1C1C] px-4 text-center shadow-sm"
            role="status"
            aria-live="polite"
          >
            <span className="text-[9px] tracking-[0.18em] uppercase text-[#C8B99A]">
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
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 font-serif text-lg text-[#1C1C1C]">
                <span className="flex min-w-0 items-center gap-3">
                  {hasQuery && (
                    <span className="shrink-0 font-sans text-[10px] tracking-[0.12em] text-[#B8942A]">
                      #{index + 1}
                    </span>
                  )}
                  <span>{item.question}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-[#B8942A] text-2xl group-open:rotate-45 transition-transform"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[#6B6560] leading-relaxed">
                {item.answer}
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
