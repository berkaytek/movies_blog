import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/400.css";
import Layout from "../components/layouts/Layout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000080'
    },
    secondary: {
      main: '#ff5722'
    },
    success: {
      main: '#4caf50'
    },
    warning: {
      main: '#ffc107'
    },
    error: {
      main: '#f44336'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  //@ts-ignore
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 8,
      },
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>

  );
}
