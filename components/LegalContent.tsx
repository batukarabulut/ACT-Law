"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextBlock = any;

interface LegalContentProps {
  content?: PortableTextBlock[] | null;
}

// Custom components for Legal Content rendering
const legalContentComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-serif text-[#111] mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-serif text-[#111] mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 mb-6">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 text-gray-600 mb-8 pl-6 list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-8">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-[#111]">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-[#10b981] hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    warningBox: ({ value }) => {
      // Render warning box content with nested PortableText
      const nestedComponents: PortableTextComponents = {
        block: {
          normal: ({ children }) => <p className="text-red-700 mb-4">{children}</p>,
        },
        marks: {
          strong: ({ children }) => <strong className="font-medium">{children}</strong>,
        },
      };
      
      return (
        <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
          {value?.title && (
            <h2 className="text-xl font-serif text-red-800 mb-4">{value.title}</h2>
          )}
          {value?.content && (
            <div className="text-red-700 space-y-4">
              <PortableText value={value.content} components={nestedComponents} />
            </div>
          )}
        </div>
      );
    },
  },
};

export default function LegalContent({ content }: LegalContentProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <div className="prose prose-gray max-w-none">
      <PortableText value={content} components={legalContentComponents} />
    </div>
  );
}
