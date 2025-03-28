import { createContext, useContext, useEffect, useState } from 'react';
import api from 'src/services/api';

interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

const CurrenciesContext = createContext<Currency[]>([] as Currency[]);

export const CurrenciesProvider = (props: { children: React.ReactNode }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const run = async () => {
      const currencies: Currency[] = await api
        .get('/currencies')
        .then((x) => x?.data);
      setCurrencies(currencies);
    };

    run();
  }, []);

  return (
    <CurrenciesContext.Provider value={currencies}>
      {props.children}
    </CurrenciesContext.Provider>
  );
};

export const useCurrencies = () => useContext(CurrenciesContext);
