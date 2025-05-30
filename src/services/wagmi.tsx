import {
  createConfig,
  http,
  WagmiProvider as OriginalWagmiProvider,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
  },
});

export const WagmiProvider = (props: { children: React.ReactNode }) => {
  return (
    <OriginalWagmiProvider config={config}>
      {props.children}
    </OriginalWagmiProvider>
  );
};
