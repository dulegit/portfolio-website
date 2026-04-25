import { localProvider } from './local';

export const cms = localProvider;

export type {
  Author,
  CMSImage,
  CMSProvider,
  ListOptions,
  Page,
  PaginatedResult,
  Post,
  SEO,
} from '../../types/cms';
