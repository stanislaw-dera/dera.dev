import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 18px;
    font-family: 'Nunito', sans-serif;
    padding: 20px;
    }
  
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  h1 {
    font-size: 2.3rem;
  }
`;

export default function Layout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />

                {children}
            </>
        </ThemeProvider>

    )
}