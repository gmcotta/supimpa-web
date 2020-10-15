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
    --color-red-error: #fe012f;
    --color-blue-lightest: #95feff;
    --color-blue-light: #15c3d6;
    --color-gradient-blue-dark: #29b6d1;
    --color-gradient-blue-light: #00c7c7;
    --color-yellow: #ffd666;
    --color-brown: #8d734b;
  }
`;
