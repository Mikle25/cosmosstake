import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.main};
    letter-spacing: 0.05em;
  }
  
  h1, h2, h3, h4, h5, ul {
    margin: 0;
  }
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.main};

    &:hover {
      color: ${({ theme }) => theme.lightGreen}
    }
  }
  
  ul {
    padding-left: 0;
  }
  
  input, button {
    border: none;
  }
`;
