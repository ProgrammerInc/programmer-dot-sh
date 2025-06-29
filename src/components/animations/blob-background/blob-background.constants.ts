/**
 * Constants for the BlobBackground component
 */

import { BlobConfig } from './blob-background.types';

/**
 * Default blob configurations
 */
export const DEFAULT_BLOBS: BlobConfig[] = [
  {
    id: 'blob1',
    gradientColors: ['#FF0080', '#7928CA'],
    size: 400,
    blur: 60,
    speed: 15,
    opacity: 0.3,
    zIndex: 1,
    initialPosition: { x: 20, y: 20 },
    pulseScale: 1.2,
    rotationSpeed: 8
  },
  {
    id: 'blob2',
    gradientColors: ['#0070F3', '#00DFD8'],
    size: 300,
    blur: 50,
    speed: 20,
    opacity: 0.2,
    zIndex: 2,
    initialPosition: { x: 60, y: 60 },
    pulseScale: 1.15,
    rotationSpeed: 12
  },
  {
    id: 'blob3',
    gradientColors: ['#7928CA', '#FF0080'],
    size: 350,
    blur: 55,
    speed: 25,
    opacity: 0.25,
    zIndex: 3,
    initialPosition: { x: 80, y: 30 },
    pulseScale: 1.1,
    rotationSpeed: 10
  }
];

/**
 * Default animation transition settings
 */
export const DEFAULT_TRANSITION = {
  duration: 20, // seconds
  ease: 'easeInOut' as const,
  repeat: Infinity,
  repeatType: 'reverse' as const
};

/**
 * Default rotation transition settings
 */
export const DEFAULT_ROTATION_TRANSITION = {
  duration: 40, // seconds
  ease: 'linear' as const,
  repeat: Infinity,
  repeatType: 'loop' as const
};
