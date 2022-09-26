/* eslint-disable quote-props */
import { transparentize } from 'polished';

/**
 * theme.js
 * Construnct new themes for styled-components Theme context.
 */

export const pxToEm = (x) => (typeof x === 'number' ? `${x / Theme.base}em` : x);
export const pxToRem = (x) => (typeof x === 'number' ? `${x / Theme.base}rem` : x);
export const emify = (arr) => arr.map(pxToEm);
export const remify = (arr) => arr.map(pxToRem);

class Theme {
  // Base size unit on root element (html), used to scale 'em' and 'rem'
  static base = 16;

  // Breakpoints values used by utils
  static breakpointsMap = new Map([
    ['sm', 640], // 40rem
    ['md', 832], // 52rem
    ['lg', 1024], // 64rem
    ['xl', 1280], // 80rem
  ]);

  constructor() {
    const colors = {
      lavender: '#8F67E9',
      lavenderLight: '#9F8DE5',
      lavenderLighter: '#F6F2FF',
      nightshadeLight: '#454B90',
      nightshade: '#211E3F',
      slate: '#413E5B',
      greenLight: '#148E86',
      green: '#0C5964',
      greenDark: '#123A38',
      yellow: '#FAB52F',
      burgundy: '#B83969',
      sand: '#E1D8D3',
      dustyBlue: '#B9C6E6',
      darkBlue: '#454B90',
      eggplant: '#473F71',
      mauve: '#C8C5D2',
      grey: '#F4F4F5',
      lightGrey: '#F8F7FA',
      darkGrey: '#C8C5D2',
      white: '#FFFFFF',
      textDark: '#211E3F',
      textMediumDark: '#413E5B',
      textMediumLight: '#838198',
      textLight: '#C7C5D3',
      textSilver: '#D0CED4',
      border: transparentize(0.8, '#211E3F'),
      borderDark: transparentize(0.8, '#8F67E9'),
    };

    this.colors = {
      foreground: colors.nightshade,
      background: colors.white,
      ...colors,
    };

    this.mode = {
      light: {
        backgroundColor: colors.white,
        borderColor: colors.mauve,
        textColor: 'nightshade',
        emphasisColor: 'lavender',
      },
      dark: {
        backgroundColor: colors.nightshade,
        borderColor: colors.eggplant,
        textColor: 'white',
        emphasisColor: 'lavenderLight',
      },
      grey: {
        backgroundColor: colors.lightGrey,
        borderColor: colors.mauve,
        textColor: 'nightshade',
        emphasisColor: 'lavenderLight',
      },
    };

    this.breakpointsObject = {};
    for (const key of Theme.breakpointsMap.keys()) {
      this.breakpointsObject[key] = Theme.breakpointsMap.get(key);
    }

    // Breakpoints prop used by styled-system
    this.breakpoints = Array.from(Theme.breakpointsMap.values(), pxToRem);

    // Breakpoint aliases
    let index = 0;
    Theme.breakpointsMap.forEach((value, key) => {
      this.breakpoints[key] = this.breakpoints[index];
      index += 1;
    });
  }

  currentBreakpoint() {
    const defaultBreakpoint = 'xs';

    if (typeof window === 'undefined') {
      return defaultBreakpoint;
    }

    // Iterate backwards to return largest breakpoint first
    for (const [key, value] of Array.from(Theme.breakpointsMap).reverse()) {
      if (window.innerWidth > value) return key;
    }

    return defaultBreakpoint;
  }

  // Font used for display copy (h1, h2, etc.)
  displayFont = '\'Caslon Doric Condensed\', sans-serif';

  // Font used for body copy
  bodyFont = '\'Graphik\', sans-serif';

  // Scale prop used by styled-system
  space = remify([0, 4, 8, 16, 32, 64, 128, 256, 512]);
  //                   0  1  2  3   4   5   6    7     8

  // Grid settings for layout
  grid = {
    columns: 12,
    columnGap: ['1.5rem',, '2rem'],
    maxWidth: '83rem',
    margins: ['1.5rem',, '3rem'],
  };

  /*
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
   * for weight mappings
  */
  weights = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };

  // Settings for Text components 'typeStyle' prop
  typography = {
    h1: {
      fontFamily: this.displayFont,
      fontSize: remify([60, 70, 100]),
      lineHeight: '1',
      letterSpacing: '0.03rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: this.displayFont,
      fontSize: remify([51, 64, 80]),
      lineHeight: '104%',
      letterSpacing: '0.02rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: this.displayFont,
      fontSize: remify([41, 52, 65]),
      lineHeight: '109%',
      letterSpacing: '0.03rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: this.bodyFont,
      fontSize: remify([17, 19, 22]),
      lineHeight: '140%',
      letterSpacing: '-0.24px',
      fontWeight: 500,
    },
    h5: {
      fontFamily: this.bodyFont,
      fontSize: remify([16, 18, 20]),
      lineHeight: '130%',
      letterSpacing: '-0.24px',
      fontWeight: 500,
    },
    h6: {
      fontFamily: this.bodyFont,
      fontSize: remify([16,, 18]),
      lineHeight: '160%',
      letterSpacing: '-0.24px',
      fontWeight: 500,
    },
    h7: {
      fontFamily: this.bodyFont,
      fontSize: remify([14,, 16]),
      lineHeight: '160%',
      letterSpacing: '-0.24px',
      fontWeight: 500,
    },
    numbers: {
      fontFamily: this.displayFont,
      fontSize: remify([51, 64, 80]),
      lineHeight: '1',
      fontWeight: 600,
    },
    subhead: {
      fontFamily: this.bodyFont,
      fontSize: remify([18,, 20]),
      lineHeight: '160%',
      letterSpacing: '-0.24px',
      fontWeight: 400,
    },
    bodyL: {
      fontFamily: this.bodyFont,
      fontSize: '1rem',
      lineHeight: '160%',
      letterSpacing: '-0.24px',
      fontWeight: 400,
    },
    bodyM: {
      fontFamily: this.bodyFont,
      fontSize: remify([14,, 16]),
      lineHeight: '160%',
      letterSpacing: '-0.24px',
      fontWeight: 400,
    },
    bodyS: {
      fontFamily: this.bodyFont,
      fontSize: remify([12,, 14]),
      lineHeight: '160%',
      letterSpacing: '-0.24px',
      fontWeight: 400,
    },
    nav: {
      fontFamily: this.bodyFont,
      fontSize: remify([28,, 16]),
      lineHeight: '20px',
      letterSpacing: '0',
      fontWeight: 400,
    },
    labelsL: {
      fontFamily: this.bodyFont,
      fontSize: remify([16]),
      lineHeight: '140%',
      letterSpacing: '0.04rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    labelsM: {
      fontFamily: this.bodyFont,
      fontSize: remify([14]),
      lineHeight: '140%',
      letterSpacing: '0.04rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    labelsS: {
      fontFamily: this.bodyFont,
      fontSize: remify([12]),
      lineHeight: '140%',
      letterSpacing: '0.04rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    buttonsL: {
      fontFamily: this.bodyFont,
      fontSize: remify([14,, 16]),
      lineHeight: '1',
      fontWeight: 500,
    },
  };
}

export { Theme };
