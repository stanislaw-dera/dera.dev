import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 18px;
    font-family: 'Bitter', sans-serif;
    padding: 20px;
    }
  
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Work Sans', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
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