import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from 'src/components/Navbar/Navbar';
import Sidebar from 'src/components/Sidebar/Sidebar';
import { AuthProvider } from 'src/hooks/useAuth';
import { CurrenciesProvider } from 'src/hooks/useCurrencies';
import { NotificationProvider } from 'src/hooks/useNotify';
import Router from 'src/Router/Router';
import { WagmiProvider } from 'src/services/wagmi';
import antTheme from 'src/theme/antTheme';
import GlobalStyle from 'src/theme/globalStyle';
import theme from 'src/theme/theme';

dayjs.extend(utc);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const queryClient = new QueryClient();

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CurrenciesProvider>
            <ThemeProvider theme={theme}>
              <ConfigProvider theme={antTheme}>
                <WagmiProvider>
                  <NotificationProvider>
                    <GlobalStyle />
                    <Sidebar
                      isOpen={isSidebarOpen}
                      setIsOpen={setIsSidebarOpen}
                    />
                    <Container>
                      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
                      <Router />
                    </Container>
                  </NotificationProvider>
                </WagmiProvider>
              </ConfigProvider>
            </ThemeProvider>
          </CurrenciesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
