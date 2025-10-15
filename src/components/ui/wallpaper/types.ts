/**
 * Basic Wallpaper type definition for build tooling
 * This file contains minimal type definitions needed by vite.config.ts
 * It matches the main Wallpaper interface from wallpaper.types.tsx
 */

export type WallpaperType = 'animation' | 'image' | 'video' | 'gradient' | 'color' | 'none';
export type WallpaperThemeType = 'light' | 'dark' | 'auto';

export interface WallpaperBackground {
  id: string;
  type: string;
  animation?: {
    id: string;
    type?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface Wallpaper {
  id: string;
  name?: string;
  description?: string;
  enabled: boolean;
  background: WallpaperBackground;
  theme?: WallpaperThemeType;
  type: WallpaperType;
}
