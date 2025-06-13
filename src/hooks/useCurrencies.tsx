import { createContext, useContext, useEffect, useState } from 'react';
import api, { Currency } from 'src/services/api';

interface CurrenciesContextType {
  currencies: Currency[];
  getSymbol: (id: number) => string | undefined;
  getName: (id: number) => string | undefined;
  getCode: (id: number) => string | undefined;
}

const CurrenciesContext = createContext<CurrenciesContextType>(
  {} as CurrenciesContextType
);

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

  const getSymbol = (id: number) =>
    currencies?.find((currency) => currency.id === id)?.symbol;

  const getName = (id: number) =>
    currencies?.find((currency) => currency.id === id)?.name;

  const getCode = (id: number) =>
    currencies?.find((currency) => currency.id === id)?.code;

  return (
    <CurrenciesContext.Provider
      value={{ currencies, getName, getCode, getSymbol }}
    >
      {props.children}
    </CurrenciesContext.Provider>
  );
};

export const useCurrencies = () => useContext(CurrenciesContext);
