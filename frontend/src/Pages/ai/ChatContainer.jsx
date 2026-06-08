import React, { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Role } from "../../types.js";

const suggestionPrompts = [
  "Explain recursion",
  "Debug my code",
  "Give key points",
];

const MarkdownContent = ({ content }) => {
  const html = useMemo(() => {
    if (!content) return "";

    const cleanHtml = DOMPurify.sanitize(marked.parse(content));
    const doc = new DOMParser().parseFromString(
      `<div>${cleanHtml}</div>`,
      "text/html"
    );
    const root = doc.body.firstElementChild;

    root.querySelectorAll("h2, h3").forEach((heading, index) => {
      const headingText = heading.textContent?.trim().toLowerCase() || "";
      heading.classList.add("ai-section-heading", `ai-section-tone-${index % 4}`);

      if (headingText.includes("important")) {
        heading.classList.add("ai-important-heading");

        let sibling = heading.nextElementSibling;
        while (sibling && !/^H[2-3]$/.test(sibling.tagName)) {
          if (sibling.matches("ul, ol")) {
            sibling.classList.add("ai-important-list");
            sibling.querySelectorAll("li").forEach((item) => {
              item.classList.add("ai-important-point");
            });
          }
          sibling = sibling.nextElementSibling;
        }
      }
    });

    root.querySelectorAll("strong").forEach((strong) => {
      const isImportant = strong.closest(".ai-important-point");
      strong.classList.add(isImportant ? "ai-important-text" : "ai-key-term");
    });

    return root.innerHTML;
  }, [content]);

  return (
    <div
      className="
        ai-markdown prose prose-sm sm:prose-base max-w-none
        text-base-content prose-headings:text-base-content
        prose-h2:mt-7 prose-h2:mb-3 prose-h2:text-[15px] prose-h2:font-semibold
        prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-sm prose-h3:font-semibold
        prose-p:my-3 prose-p:text-base-content/90
        prose-ul:my-3 prose-ol:my-3 prose-li:my-1.5 prose-li:pl-1
        prose-code:text-emerald-600
        prose-code:bg-base-200 prose-code:px-1.5 prose-code:py-0.5
        prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-base-200 prose-pre:border prose-pre:border-base-300
        prose-pre:text-base-content prose-pre:rounded-xl
        leading-7
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const ChatContainer = ({ messages, isStreaming }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 text-center animate-in fade-in duration-700">
        <div
          className="
            mb-8 flex h-16 w-16 items-center justify-center rounded-2xl
            bg-base-200 text-base-content border border-base-300 shadow-sm
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
            />
          </svg>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
            AlgoArena AI
          </h2>
          <p className="mx-auto max-w-md text-base leading-7 text-base-content/60">
            Ask a coding doubt, paste an error, or get a concept explained step by step.
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {suggestionPrompts.map((item) => (
            <div
              key={item}
              className="
                rounded-xl border border-base-300 bg-base-100
                px-4 py-3 text-sm font-medium text-base-content/70
              "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-base-100 px-4 py-7 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8">
        {messages.map((message) => {
          if (
            message.role === Role.ASSISTANT &&
            !message.content &&
            isStreaming
          ) {
            return null;
          }

          const isUser = message.role === Role.USER;

          return (
            <div
              key={message.id}
              className={`
                flex w-full gap-3 animate-in slide-in-from-bottom-2 duration-300
                ${isUser ? "justify-end" : "justify-start"}
              `}
            >
              {!isUser && (
                <div
                  className="
                    mt-1 hidden h-8 w-8 shrink-0 items-center justify-center
                    rounded-full bg-base-200 text-xs font-bold text-emerald-600
                    ring-1 ring-base-300 sm:flex
                  "
                >
                  AI
                </div>
              )}

              <div
                className={`
                  min-w-0
                  ${
                    isUser
                      ? "max-w-[88%] rounded-3xl bg-base-200 px-5 py-3 text-base-content shadow-sm"
                      : "w-full pt-1 text-base-content"
                  }
                `}
              >
                {!isUser && (
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-base-content/50">
                    <span>AlgoArena AI</span>
                    <span className="h-1 w-1 rounded-full bg-base-content/30" />
                    <span>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                {isUser ? (
                  <p className="m-0 whitespace-pre-wrap text-[15px] leading-7">
                    {message.content}
                  </p>
                ) : (
                  <MarkdownContent content={message.content} />
                )}
              </div>
            </div>
          );
        })}

        {isStreaming && (
          <div className="flex justify-start gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
            <div
              className="
                mt-1 hidden h-8 w-8 shrink-0 items-center justify-center
                rounded-full bg-base-200 text-xs font-bold text-emerald-600
                ring-1 ring-base-300 sm:flex
              "
            >
              AI
            </div>
            <div className="rounded-2xl bg-base-200 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        <div className="h-2" />
      </div>
    </div>
  );
};
