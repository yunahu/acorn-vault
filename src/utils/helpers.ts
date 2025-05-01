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
