import { createGlobalStyle } from 'styled-components';
import nats from '../../assets/fonts/nats.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Roboto Light';
    src: url(${nats}) format('truetype');
  }
  body {
    margin: 0;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Nats', sans-serif;
    font-size: 14px;
    color: white;
  }
  
  h1, h2, h3, h4, h5, ul {
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }
  
  input, button {
    border: none;
  }
`;
