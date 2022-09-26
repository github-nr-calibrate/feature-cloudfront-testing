import { createGlobalStyle } from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';

export const GlobalStyles = createGlobalStyle`
  :root {
      --color__lavender: #8F67E9;
      --color__lavenderLight: #9F8DE5;
      --color__nightshadeLight: #454B90;
      --color__nightshade: #211E3F;
      --color__slate: #413E5B;
      --color__greenLight: #148E86;
      --color__green: #0C5964;
      --color__greenDark: #123A38;
      --color__yellow: #FAB52F;
      --color__marigold: #FBB52F;
      --color__burgundy: #B83969;
      --color__sand: #E1D8D3;
      --color__grey: #F8F7FA;
      --color__white: #FFFFFF;
      --color__textDark: #211E3F;
      --color__textMediumDark: #413E5B;
      --color__textMediumLight: #838198;
      --color__textLight: #C7C5D3;
      --color__black: #000000;
      --color__mauve: #C8C5D2;
      --color__eggplant: #473F71;
      --color__dustyPurple: #838198;
      --font__display: 'Caslon Doric Condensed', sans-serif;
      --font__body: 'Graphik', sans-serif;
      --height__nav: 62px;
      --border__nightshade: 1px solid #473F71;
      --border__default: 1px solid #C8C5D2;
      --emphasis-color: var(--color__lavender);
      --text-color: var(--color__nightshade);
      --border-color: var(--color__mauve);
      --spacing__xl: 5rem; // 80px
      --spacing__lg: 4.0625rem; // 65px
      --spacing__md: 3.125rem; // 50px
      --spacing__sm: 1.875rem; // 30px
      --spacing__xs: 0.625rem; // 10px 
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    text-rendering: optimizelegibility;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
  }
  a {
    text-decoration: none;
  }
  p a {
    text-decoration: underline;
  }
  address {
    font-style: normal;
  }
  sup {
    display: inline-block;
    vertical-align: text-top;
    position: relative;
    top: -0.5em;
    text-decoration: none;
  }
  button {
    appearance: none;
    color: inherit;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    touch-action: manipulation;
    background: transparent;
    border: none;
    font-family: inherit;
    text-align: inherit;
  }

  html {
    font-family: sans-serif;
    font-size: ${({ theme }) => theme.base}px;
  }

  @supports (font-variation-settings: normal) {
    html { font-family: ${({ theme }) => theme.bodyFont} }
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    position: relative;
    width: 100%;
    max-width: 110rem;
    overflow-x: hidden;
    margin: 0 auto;
    box-shadow:
      0px 0.223139px 3.73436px rgba(0, 0, 0, 0.0196802),
      0px 1.25481px 8.97418px rgba(0, 0, 0, 0.0282725),
      0px 3.09664px 16.8976px rgba(0, 0, 0, 0.035),
      0px 6.00918px 30.1424px rgba(0, 0, 0, 0.0417275),
      0px 10.7546px 56.3781px rgba(0, 0, 0, 0.0503198),
      0px 21.6881px 134.948px rgba(0, 0, 0, 0.07);
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.lavenderLight};
    color: ${({ theme }) => theme.colors.white};
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
  }

  cite, address, strong, em {
    font-style: normal;
  }

  strong {
    font-weight: 600;
  }

  .async-hide { opacity: 0 !important }

  .visually-hidden {
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .block-img {
    img {
      max-width: 100%;
      height: auto;
    }
  }

  .modal {
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    z-index: 100;

    // Restrict video size in modals
    .VideoContainer {
      max-height: calc(100vh - 8rem); // Never overlap the close button
      margin: 0 auto;
    }
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;

    &--after-open {
        opacity: 1;
    }

    &--before-close {
        opacity: 0;
    }
  }

  .util__body-lock {
    position: relative;
    overflow: hidden;
    height: 100vh;
  }

  .mobile-only {
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: none;
    }
  }

  .tablet-down {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .desktop-only {
    @media (max-width: calc(${({ theme }) => theme.breakpoints.md} - 0.0625rem)) {
      display: none;
    }
  }

  .button {
    align-self: flex-start;
    color: white;
    cursor: pointer;
    border-radius: 200px;
    transition: color 0.4s ease, background 0.4s ease;
    padding: 17px 56px 20px 56px;
    display: inline-block;
    font-weight: 500;
    font-size: 1rem;
    width: 100%;
    max-width: 100%;
    text-align: center;
    background-color: var(--color__nightshade);
    border: 1px solid var(--color__nightshade);
    overflow: hidden;

    :hover {
      background: white;
      color: var(--color__nightshade);
    }

    .theme--dark & {
      background: white;
      color: var(--color__nightshade);
      border: none;

      &:hover {
        background: var(--color__lavender);
        color: white;
      }
    }

    ${MQAbove.md`
      width: auto;
    `}

    &--full {
      ${MQAbove.md`
        width: 100%;
        min-width: auto;
      `}
    }

    &[class*="inverse"] {
      background-color: transparent;
      box-shadow: none;
      border: 1px solid var(--text-color);
      color: var(--text-color);

      :hover {
        background: var(--color__nightshade);
        border: 1px solid var(--color__nightshade);
        color: white;
      }

      .theme--dark & {
        &:hover {
          background: var(--color__lavender);
          border: 1px solid var(--color__lavender);
          color: white;
        }
     }
    }

    &:disabled {
      opacity: 0.4;
    }
  }

  .hide-prefers-reduced-motion {
    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }

  .show-prefers-reduced-motion {
    display: none;

    @media (prefers-reduced-motion: reduce) {
      display: inherit;
    }
  }

  .anchor-link {
    scroll-margin-top: 5.8125rem;

    ${MQAbove.md`
      scroll-margin-top: 7.8125rem;
    `}
  }

  .no-fallback-image {
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 5%);
  }

  .footnote__link {
    a {
      text-decoration: none !important;
      background: black;
      color: white;
      padding: 0 5px;
      display: block;
      font-size: 10px;
      margin-top: 3px;
    }
  }

  // Fade in lazy loaded images
  .lazyloading {
    opacity: 0;
  }

  .lazyloaded {
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  img[src=''],
  img:not([src]) {
    opacity: 0;
  }

  // Styles to add spacing to the heroes
  .point_hero.section-theme--light.has-items + .section-theme--dark,
  .point_hero.section-theme--light.has-items + .section-theme--grey,
  .point_hero.section-theme--dark.has-items + .section-theme--light,
  .point_hero.section-theme--dark.has-items + .section-theme--grey {
    &:before {
      content: '';
      height: var(--spacing__md);
      width: 100%;
      display: block;

      ${MQAbove.md`
        height: var(--spacing__lg);
      `}
    }
  }

  .point_hero.section-theme--light.has-items + .section-theme--dark,
  .point_hero.section-theme--light.has-items + .section-theme--grey {
    &:before {
      background: white;
    }
  }

  .point_hero.section-theme--dark.has-items + .section-theme--light,
  .point_hero.section-theme--dark.has-items + .section-theme--grey {
    &:before {
      background: var(--color__nightshade);
    }
  }

  .point_hero.section-theme--grey.has-items + .section-theme--light,
  .point_hero.section-theme--grey.has-items + .section-theme--dark {
    &:before {
      background: var(--color__grey);
    }
  }
`;
