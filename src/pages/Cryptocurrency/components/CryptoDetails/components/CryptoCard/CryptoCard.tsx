import { useMemo } from 'react';
import StatsCard, {
  Data,
  FormattedRow,
  GraphDatum,
} from 'src/components/cards/StatsCard/StatsCard';
import { formatNumber } from 'src/utils/helpers';
import { CoinStats, ProcessingResult } from '../../CryptoDetails';

interface CryptoCardProps {
  coinStats: ProcessingResult<CoinStats>;
}

const CryptoCard = ({ coinStats }: CryptoCardProps) => {
  const { data, isLoading } = coinStats;

  const processRows = (): FormattedRow[] | undefined =>
    data?.rows.map(({ coin, formattedAmount, amountInPC, percentage }) => ({
      key: coin.id,
      name: coin.name,
      formattedAmount,
      amountInPC: amountInPC.toNumber(),
      percentage: percentage.toNumber(),
      $negative: false,
    }));

  const processGraphData = (): GraphDatum[] | undefined => {
    const nonZeroRows = data?.rows.filter((x) => x.amountInPC.toNumber() > 0);
    return (
      nonZeroRows?.map(({ coin, percentage }) => ({
        id: coin.symbol,
        label: coin.symbol,
        value: formatNumber(percentage.toNumber()),
      })) ?? []
    );
  };

  const processData = (): Data | undefined => {
    if (!data) return;

    const rows = processRows();
    const graphData = processGraphData();
    if (!rows || !graphData) return;

    return {
      primaryCurrencyId: data.primaryCurrencyId,
      sum: data.sum.toNumber(),
      rows,
      graphData,
    };
  };

  const processedData = useMemo(processData, [data]);

  return (
    <StatsCard
      title="Crypto Assets"
      $isLoading={isLoading}
      data={processedData}
    />
  );
};

export default CryptoCard;
