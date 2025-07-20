// Calculate minimal decimal places required to display coin amount with 1 cent USD accuracy
export const calculateDecimalPlaces = (
  primaryCurrencyPrice: number, // 1 USD = $x
  coinPriceInPrimaryCurrency: number // 1 coin = $x
) => {
  const k = primaryCurrencyPrice / 100; // $k = 0.01 USD
  const x = k / coinPriceInPrimaryCurrency; // x coins = 0.01 USD
  const j = x % 1;

  if (j === 0) return 0;

  return Math.ceil(Math.log10(j) * -1);
};

export const formatCoinAmount = (
  amount: BigNumber,
  coinPriceInPrimaryCurrency: number,
  primaryCurrencyPrice: number
): string => {
  const decimalPlaces = calculateDecimalPlaces(
    coinPriceInPrimaryCurrency,
    primaryCurrencyPrice
  );

  return amount.toNumber().toLocaleString('en-US', {
    maximumFractionDigits: decimalPlaces,
  });
};

export const formatNumber = (value: number | string): string => {
  let num: number;
  if (typeof value === 'string') {
    num = parseFloat(value);
  } else {
    num = value;
  }
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
