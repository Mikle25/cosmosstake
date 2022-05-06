import { createGlobalStyle } from 'styled-components';
import nats from '../../assets/fonts/nats.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Nats';
    src: url(${nats}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  body {
    margin: 0;
    font-family: 'Nats',  sans-serif;
    font-size: 14px;
    color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, ul {
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }
`;
