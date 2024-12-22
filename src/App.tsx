import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "src/theme/theme";
import GlobalStyle from "src/theme/globalStyle";
import Router from "src/Router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} />
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
};

export default App;
