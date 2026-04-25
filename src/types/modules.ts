/**
 * Types shared across marketing modules.
 * Kept in /types (not /lib/cms) because these are UI-shaped, not CMS-shaped.
 * When wiring a CMS, map from CMS types → these types in the page frontmatter.
 */

export interface CTALink {
  label: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Hint for external links — renders target="_blank" rel="noopener noreferrer" */
  external?: boolean;
}
