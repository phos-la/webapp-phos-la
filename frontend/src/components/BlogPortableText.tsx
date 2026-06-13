'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

/**
 * Render a Field Notes post body authored as Sanity Portable Text (rich text).
 * Emits plain semantic tags. The `.blogpost-body` rules in blog.css style
 * p, h2, h3, a, ul, ol, li, blockquote, so no extra classes are needed here.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? '';
      const isExternal = value?.blank || href.startsWith('http');
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <a href={href}>{children}</a>;
    },
  },
};

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
