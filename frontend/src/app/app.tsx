import React, { FC } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./routes";
import GlobalFunctionality from "./globalFunctionality";
import ErrorFallback from "./errorFallback";
import { ThemeProvider } from "./theme-provider";
import { AppProvider } from "./app-provider";

import "antd/dist/reset.css";
import "./app.scss";

const queryClient = new QueryClient();

const App: FC = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload();
          }}
        >
          <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
              <GlobalFunctionality />
              <Routes />
            </BrowserRouter>
          </SnackbarProvider>
        </ErrorBoundary>
      </AppProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
