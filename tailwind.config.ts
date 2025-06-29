/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
import { gradientPlugin } from './tailwind.plugins';

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars
  });
}

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        terminal: {
          background: 'var(--terminal-background)',
          'background-translucent': 'var(--terminal-background-translucent)',
          foreground: 'var(--terminal-foreground)',
          prompt: 'var(--terminal-prompt)',
          success: 'var(--terminal-success)',
          error: 'var(--terminal-error)',
          warning: 'var(--terminal-warning)',
          command: 'var(--terminal-command)',
          link: 'var(--terminal-link)',
          muted: 'var(--terminal-muted)',
          'muted-30': 'var(--terminal-muted-30)',
          'muted-50': 'var(--terminal-muted-50)',
          'prompt-50': 'var(--terminal-prompt-50)',
          header: 'var(--terminal-background)',
          border: 'var(--terminal-border)',
          title: 'var(--terminal-foreground)',
          close: '#FF5F56',
          minimize: '#FFBD2E',
          maximize: '#27C93F',
          dropdown: 'hsl(var(--terminal-dropdown))',
          'dropdown-hover': 'hsl(var(--terminal-dropdown-hover))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%'
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%'
          }
        },
        'beam-drop': {
          '0%': {
            opacity: '0',
            '--offset': '-100%'
          },
          '5%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0',
            '--offset': '100%'
          }
        },
        'beam-pulse': {
          '0%': {
            opacity: '0.3',
            '--pulse-scale': '0.95'
          },
          '50%': {
            opacity: '1',
            '--pulse-scale': '1.05'
          },
          '100%': {
            opacity: '0.3',
            '--pulse-scale': '0.95'
          }
        },
        'beam-shimmer': {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.3' }
        },
        blink: {
          '50%': { opacity: '0.6' }
        },
        'crosshatch-shift': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(45deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'diamonds-shift': {
          '0%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(25%) translateY(25%) scale(0.8)' },
          '100%': { transform: 'translateX(0) translateY(0) scale(1)' }
        },
        'dots-shift': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' }
        },
        flicker: {
          '0%': { '--webkit-mask-position': '50% 50%, 4px 50%', maskPosition: '50% 50%, 4px 50%' },
          '25%': {
            '--webkit-mask-position': '50% 50%, 2.75px 50%',
            maskPosition: '50% 50%, 2.75px 50%'
          },
          '50%': {
            '--webkit-mask-position': '50% 50%, 1.5px 50%',
            maskPosition: '50% 50%, 1.5px 50%'
          },
          '75%': {
            '--webkit-mask-position': '50% 50%, 0.75px 50%',
            maskPosition: '50% 50%, 0.75px 50%'
          },
          '100%': { '--webkit-mask-position': '50% 50%, 0 50%', maskPosition: '50% 50%, 0 50%' }
        },
        glitch: {
          '0%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '5%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '10%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '15%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '20%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '25%': { 'clip-path': 'inset(40% 0 20% 0)' },
          '30%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '35%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '40%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '45%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '50%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '55%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '60%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '65%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '70%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '75%': { 'clip-path': 'inset(40% 0 20% 0)' },
          '80%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '85%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '90%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '95%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '100%': { 'clip-path': 'inset(30% 0 40% 0)' }
        },
        'glitch-overlay': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(0)' }
        },
        glow: {
          '0%, 100%': {
            opacity: 'var(--base-opacity, 0.1)',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: 'var(--glow-opacity, 0.8)',
            transform: 'scale(1.15)'
          }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.8)' }
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'gradient-animation': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.5) rotate(180deg)' },
          '100%': { transform: 'scale(1) rotate(360deg)' }
        },
        'lines-shift': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(50%) translateY(50%)' },
          '100%': { transform: 'translateX(0) translateY(0)' }
        },
        marquee: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-50%)' }
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0'
          }
        },
        'move-horizontal': {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)'
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)'
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)'
          }
        },
        'move-in-circle': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '50%': {
            transform: 'rotate(180deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        'move-vertical': {
          '0%': {
            transform: 'translateY(-50%)'
          },
          '50%': {
            transform: 'translateY(50%)'
          },
          '100%': {
            transform: 'translateY(-50%)'
          }
        },
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)'
          }
        },
        'squares-shift': {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateX(25%) translateY(25%) rotate(180deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(360deg)' }
        },
        'star-movement-bottom': {
          '0%': { transform: 'translateX(0) rotate(0)' },
          '100%': { transform: 'translateX(-100vw) rotate(360deg)' }
        },
        'star-movement-top': {
          '0%': { transform: 'translateX(0) rotate(0)' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)' }
        },
        'text-typing': {
          from: { width: '0' },
          to: { width: '100%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        aurora: 'aurora 60s linear infinite',
        'beam-drop': 'beam-drop 7s cubic-bezier(0.4, 0.26, 0, 0.97) infinite',
        'beam-pulse': 'beam-pulse 4s ease-in-out infinite',
        'beam-shimmer': 'beam-shimmer 7s linear infinite',
        'beam-wave': 'beam-wave 10s ease-in-out infinite',
        'beam-zigzag': 'beam-zigzag 6s ease-in-out infinite',
        blink: 'blink 2s linear infinite',
        'crosshatch-shift': 'crosshatch-shift 20s linear infinite',
        'cursor-blink': 'cursor-blink 1s infinite',
        'diamonds-shift': 'diamonds-shift 20s linear infinite',
        'dots-shift': 'dots-shift 20s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        fifth: 'move-in-circle 20s ease infinite',
        first: 'move-vertical 30s ease infinite',
        flicker: 'flicker 30s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        fourth: 'move-horizontal 40s ease infinite',
        'glitch-after': 'glitch var(--after-duration) infinite linear alternate-reverse',
        'glitch-before': 'glitch var(--before-duration) infinite linear alternate-reverse',
        'glow-pulse': 'glow-pulse 2s infinite',
        gradient: 'gradient 8s linear infinite',
        'lines-shift': 'lines-shift 20s linear infinite',
        marquee: 'marquee 15s linear infinite',
        'meteor-effect': 'meteor 5s linear infinite',
        'scale-up': 'scale-up 0.2s ease-out',
        second: 'move-in-circle 20s reverse infinite',
        shine: 'shine 5s linear infinite',
        spin: 'spin 10s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'squares-shift': 'squares-shift 20s linear infinite',
        'star-movement-bottom': 'star-movement-bottom 6s linear infinite',
        'star-movement-top': 'star-movement-top 6s linear infinite',
        'text-typing': 'text-typing 3.5s steps(40, end)',
        third: 'move-in-circle 40s linear infinite'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace']
      },
      translate: {
        '101': '101%'
      }
    }
  },
  plugins: [tailwindcssAnimate, addVariablesForColors, gradientPlugin],
  safelist: ['group', 'group-hover:opacity-100']
} satisfies Config;
