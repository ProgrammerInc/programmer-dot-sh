/**
 * Simplified Wallpaper types for build tooling and non-JSX contexts
 * 
 * This file provides basic type definitions that can be imported
 * in vite.config.ts and other non-JSX files.
 */

import type { CSSProperties } from 'react';

/**
 * Simplified Wallpaper interface for build tooling
 */
export interface Wallpaper {
  id: string;
  name?: string;
  description?: string;
  enabled: boolean;
  background: {
    id: string;
    name?: string;
    description?: string;
    animation?: {
      id: string;
      name?: string;
      description?: string;
      url?: string;
      animationProps?: Record<string, unknown>;
      type: string;
    };
    colors?: Array<{
      id: string;
      name?: string;
      description?: string;
      color: string;
      type: string;
    }>;
    gradient?: {
      id: string;
      name?: string;
      description?: string;
      alpha?: number;
      gradient?: string;
      style?: CSSProperties;
      type: string;
    };
    image?: {
      id: string;
      name?: string;
      description?: string;
      url?: string;
      mimeType: string;
      type: string;
      [key: string]: unknown;
    };
    style?: CSSProperties;
    type: string;
    video?: {
      id: string;
      name?: string;
      description?: string;
      url?: string;
      mimeType: string;
      type: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  style?: CSSProperties;
  theme?: string;
  type: string;
}
