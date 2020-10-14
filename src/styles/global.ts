import { create } from 'domain';
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
  }
`;
