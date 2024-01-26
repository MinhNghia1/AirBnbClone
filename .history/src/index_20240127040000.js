import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./Components/ScssGlobal/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF385C", // Đổi màu chính
    },
    secondary: {
      main: "#FF385C", // Đổi màu phụ
    },
  },
});
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);


reportWebVitals();
