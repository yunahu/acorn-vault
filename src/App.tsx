import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { AuthProvider } from 'src/hooks/useAuth';
import { CurrenciesProvider } from 'src/hooks/useCurrencies';
import theme from 'src/theme/theme';
import antTheme from 'src/theme/antTheme';
import GlobalStyle from 'src/theme/globalStyle';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Navbar from 'src/components/Navbar/Navbar';
import Router from 'src/Router/Router';

dayjs.extend(utc);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CurrenciesProvider>
            <ThemeProvider theme={theme}>
              <ConfigProvider theme={antTheme}>
                <GlobalStyle />
                <Sidebar />
                <Container>
                  <Navbar />
                  <Router />
                </Container>
              </ConfigProvider>
            </ThemeProvider>
          </CurrenciesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
