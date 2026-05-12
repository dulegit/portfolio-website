export interface CTALink {
  label: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Hint for external links — renders target="_blank" rel="noopener noreferrer" */
  external?: boolean;
}
