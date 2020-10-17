import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html, border-style, #root {
    max-height: 100vh;
    max-width: 100vw;
    height: 100%;
    width: 100%;
  }

  *, button, input {
    font-family: 'Montserrat', sans-serif;
  }

  :root {
    --color-white: #fff;
    --color-black: #000;
    --color-light: #fffcf7;
    --color-background-light: #f9fafc;
    --color-background: #ebf2f5;
    --color-red-error: #fe012f;
    --color-blue-lightest-2: #e6f7fb;
    --color-blue-lightest: #95feff;
    --color-blue-light: #15c3d6;
    --color-blue-dark: #0089a5;
    --color-gradient-blue-dark: #29b6d1;
    --color-gradient-blue-light: #00c7c7;
    --color-green-lightest: #edfff6;
    --color-green-light: #a1e9c5;
    --color-gray-light: #eee;
    --color-gray: #ddd;
    --color-gray-dark: #8a8d8b;
    --color-pink-lightest: #fdf0f5;
    --color-pink-light: #ffe4ee;
    --color-yellow: #ffd666;
    --color-orange: #ff9505;
    --color-brown: #8d734b;
    --color-title-dark-blue: #4d6f80;
    --color-text-blue: #5c8599;
    --color-text-green: #37c77f;
    --color-text-pink: #ff669d;
    --color-whatsapp: #37c77f;
    --color-input-label-text: #8fa7b2;
    --color-input-border: #dde3f0;
  }
`;
