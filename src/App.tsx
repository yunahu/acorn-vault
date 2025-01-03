import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "src/theme/theme";
import GlobalStyle from "src/theme/globalStyle";
import Sidebar from "src/components/Sidebar/Sidebar";
import Navbar from "src/components/Navbar/Navbar";
import Router from "src/Router/Router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Sidebar />
        <Container>
          <Navbar />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
