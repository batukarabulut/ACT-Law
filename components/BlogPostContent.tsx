"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { useTranslations } from "next-intl";
import { urlForOptimized, IMAGE_PRESETS } from "@/sanity/lib/image";

interface Heading {
  id: string;
  text: string;
  level: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextBlock = any;

interface BlogPostContentProps {
  content?: PortableTextBlock[] | string | null;
  title: string;
  slug: string;
  shareUrl: string;
}

// Custom components for Portable Text rendering
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        data-heading-id={`heading-${value._key}`}
        className="text-2xl font-serif text-[#111] mt-10 mb-4 scroll-mt-28"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        data-heading-id={`heading-${value._key}`}
        className="text-xl font-serif text-[#111] mt-8 mb-3 scroll-mt-28"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-serif text-[#111] mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children, value }) => {
      const text = (value?.children || []).map((c) => (typeof c === "object" && c && "text" in c ? (c as { text?: string }).text : "") || "").join("").trim();
      // ## / ### / #### ile başlayan satırlar -> başlık
      if (text.startsWith("## ")) {
        return (
          <h2
            data-heading-id={`heading-${value._key}`}
            className="text-2xl font-serif text-[#111] mt-10 mb-4 scroll-mt-28"
          >
            {text.replace(/^## /, "")}
          </h2>
        );
      }
      if (text.startsWith("### ")) {
        return (
          <h3
            data-heading-id={`heading-${value._key}`}
            className="text-xl font-serif text-[#111] mt-8 mb-3 scroll-mt-28"
          >
            {text.replace(/^### /, "")}
          </h3>
        );
      }
      if (text.startsWith("#### ")) {
        return (
          <h4 data-heading-id={`heading-${value._key}`} className="text-lg font-serif text-[#111] mt-6 mb-2">
            {text.replace(/^#### /, "")}
          </h4>
        );
      }
      // - ile başlayan satırlar -> liste (blok tamamen - satırlarıysa)
      const lines = text.split("\n");
      const listLines = lines.filter((l) => l.startsWith("- "));
      const nonEmpty = lines.filter((l) => l.trim() !== "");
      const allAreList = nonEmpty.length > 0 && nonEmpty.every((l) => l.startsWith("- "));
      if (allAreList && listLines.length > 0) {
        return (
          <ul className="list-disc pl-5 space-y-2 my-4">
            {listLines.map((line, i) => (
              <li key={i} className="text-gray-600">
                {line.replace(/^- /, "")}
              </li>
            ))}
          </ul>
        );
      }
      return <p className="text-gray-600 leading-relaxed mb-4">{children}</p>;
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#10b981] pl-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2 my-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-600">{children}</li>,
    number: ({ children }) => <li className="text-gray-600">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-[#10b981] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref
        ? urlForOptimized(value, IMAGE_PRESETS.contentInline)
        : null;
      const alt = (value?.caption as string) || "";
      if (!url) return null;
      return (
        <figure className="my-8 max-w-2xl mx-auto">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm">
            <Image
              src={url}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
          {alt && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogPostContent({ content, title, slug, shareUrl }: BlogPostContentProps) {
  const t = useTranslations("blogPost");
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content is Portable Text (array) or string
  const isPortableText = Array.isArray(content);

  // Parse headings from content
  useEffect(() => {
    if (!content) return;

    const parsedHeadings: Heading[] = [];

    if (isPortableText) {
      // Parse headings from Portable Text (hem style: h2/h3 hem de normal paragrafta ## / ###)
      content.forEach((block: PortableTextBlock) => {
        if (block._type !== "block" || !block.children) return;
        const text = block.children.map((c: { text?: string }) => c.text || "").join("").trim();
        if (block.style === "h2" || block.style === "h3") {
          parsedHeadings.push({
            id: `heading-${block._key}`,
            text,
            level: block.style === "h2" ? 2 : 3,
          });
        } else if (block.style === "normal" || !block.style) {
          if (text.startsWith("## ")) {
            parsedHeadings.push({ id: `heading-${block._key}`, text: text.replace(/^## /, ""), level: 2 });
          } else if (text.startsWith("### ")) {
            parsedHeadings.push({ id: `heading-${block._key}`, text: text.replace(/^### /, ""), level: 3 });
          } else if (text.startsWith("#### ")) {
            parsedHeadings.push({ id: `heading-${block._key}`, text: text.replace(/^#### /, ""), level: 4 });
          }
        }
      });
    } else if (typeof content === "string") {
      // Parse headings from plain text (fallback for static data)
      const paragraphs = content.split("\n\n");
      paragraphs.forEach((p, index) => {
        if (p.startsWith("## ")) {
          parsedHeadings.push({
            id: `heading-${index}`,
            text: p.replace("## ", ""),
            level: 2,
          });
        } else if (p.startsWith("### ")) {
          parsedHeadings.push({
            id: `heading-${index}`,
            text: p.replace("### ", ""),
            level: 3,
          });
        }
      });
    }

    setHeadings(parsedHeadings);
    if (parsedHeadings.length > 0) {
      setActiveHeading(parsedHeadings[0].id);
    }
  }, [content, isPortableText]);

  // Track scroll progress (viewport ortası referans: 0% = ortası içeriğin başında, 100% = ortası içeriğin sonunda)
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const viewportCenterY = window.scrollY + windowHeight / 2;
      const contentTopDoc = rect.top + window.scrollY;
      const elementHeight = rect.height;

      // İlerleme: viewport ortası içerikte nerede? 0% başta, 100% sonda
      const rawProgress = (viewportCenterY - contentTopDoc) / elementHeight;
      const currentProgress = Math.min(100, Math.max(0, rawProgress * 100));

      setProgress(Math.round(currentProgress));

      // Find active heading (viewport ortasına en yakın başlık)
      const headingElements = element.querySelectorAll("[data-heading-id]");
      let currentActiveHeading = "";

      headingElements.forEach((heading) => {
        const headingRect = heading.getBoundingClientRect();
        if (headingRect.top < windowHeight / 2) {
          currentActiveHeading = heading.getAttribute("data-heading-id") || "";
        }
      });

      if (currentActiveHeading) {
        setActiveHeading(currentActiveHeading);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.querySelector(`[data-heading-id="${id}"]`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const elementCenterOffset = (element as HTMLElement).offsetHeight / 2;
      const viewportCenter = window.innerHeight / 2;
      const top = absoluteTop - viewportCenter + elementCenterOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Render content - either Portable Text or plain string
  const renderContent = () => {
    if (!content) {
      return <p className="text-gray-500">{t("loading")}</p>;
    }

    if (isPortableText) {
      return <PortableText value={content} components={portableTextComponents} />;
    }

    // Fallback for plain text content (static data)
    if (typeof content === "string") {
      const paragraphs = content.split("\n\n");
      return paragraphs.map((p, i) => {
        if (p.startsWith("## ")) {
          return (
            <h2
              key={i}
              data-heading-id={`heading-${i}`}
              className="text-2xl font-serif text-[#111] mt-10 mb-4 scroll-mt-28"
            >
              {p.replace("## ", "")}
            </h2>
          );
        }
        if (p.startsWith("### ")) {
          return (
            <h3
              key={i}
              data-heading-id={`heading-${i}`}
              className="text-xl font-serif text-[#111] mt-8 mb-3 scroll-mt-28"
            >
              {p.replace("### ", "")}
            </h3>
          );
        }
        if (p.startsWith("- ")) {
          const items = p.split("\n").filter((item) => item.startsWith("- "));
          return (
            <ul key={i} className="list-disc pl-5 space-y-2 my-4">
              {items.map((item, j) => (
                <li key={j} className="text-gray-600">
                  {item.replace("- ", "")}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-gray-600 leading-relaxed mb-4">
            {p}
          </p>
        );
      });
    }

    return null;
  };

  return (
    <div className="relative">
      {/* Table of Contents - Left Sidebar (blog içeriği görünmeye başladıktan sonra göster) */}
      {headings.length > 0 && progress > 0 && progress < 100 && (
        <div className="hidden xl:block fixed left-8 2xl:left-[calc((100vw-1280px)/2-220px)] top-1/2 -translate-y-1/2 w-56 transition-opacity duration-300">
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block text-left w-full text-sm transition-colors ${
                  heading.level === 3 ? "pl-4" : ""
                } ${
                  activeHeading === heading.id
                    ? "text-[#10b981] font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                  <span className="line-clamp-2">{heading.text}</span>
                </span>
              </button>
            ))}
          </nav>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10b981] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-[#10b981] font-medium mt-2">%{progress}</p>
          </div>
        </div>
      )}

      {/* Share Buttons - Right Sidebar (yazı başladıktan sonra göster) */}
      {progress > 0 && progress < 100 && (
        <div className="hidden xl:block fixed right-8 2xl:right-[calc((100vw-1280px)/2-80px)] top-1/2 -translate-y-1/2 transition-opacity duration-300">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-medium tracking-wider uppercase text-gray-400 mb-2">
              {t("share")}
            </span>
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-[#10b981] hover:border-[#10b981] transition-colors"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Share & TOC (blog içeriği görünmeye başladıktan sonra göster) */}
      {headings.length > 0 && progress > 0 && progress < 100 && (
        <div className="xl:hidden mb-8 p-4 bg-gray-50 rounded-lg transition-opacity duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">{t("toc")}</span>
            <span className="text-sm text-[#10b981] font-medium">%{progress}</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#10b981] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {headings.slice(0, 4).map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  activeHeading === heading.id
                    ? "bg-[#10b981] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#10b981]"
                }`}
              >
                {heading.text.length > 25 ? heading.text.slice(0, 25) + "..." : heading.text}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{t("share")}:</span>
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#10b981] hover:border-[#10b981] transition-colors"
                title={link.name}
              >
                <span className="w-4 h-4">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <article ref={contentRef} className="prose prose-lg max-w-none">
        {renderContent()}
      </article>
    </div>
  );
}
