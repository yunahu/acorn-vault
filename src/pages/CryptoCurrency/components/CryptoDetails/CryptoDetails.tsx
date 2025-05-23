import { useEffect, useState } from 'react';
import Card from 'src/components/cards/Card/Card';
import { CoinWithBalance, getCoinsWithBalance } from 'src/services/viem';
import { useAccount } from 'wagmi';

const CryptoDetails = () => {
  const { address } = useAccount();
  const [coinsWithBalance, setCoinsWithBalances] = useState<CoinWithBalance[]>(
    []
  );

  useEffect(() => {
    if (address) {
      const run = async () => {
        const data = await getCoinsWithBalance(address);
        setCoinsWithBalances(data);
      };

      run();
    }
  }, [address]);

  return (
    <Card $fullWidth>
      {coinsWithBalance.map(({ coin, balance }) => (
        <div key={coin.id}>
          <div>
            {coin.name} ({coin.symbol})
          </div>
          <div>{balance.toFixed()}</div>
        </div>
      ))}
    </Card>
  );
};

export default CryptoDetails;
