import {
  DollarSign,
  EuroSign,
  SterlingSign,
  BitcoinSign,
  EthereumSign,
} from "../../icons/currencyIcons";

export const currencyList = [
  {
    name: "USD",
    symbol: <DollarSign />,
    id: `${Math.random()}-${Math.random()}`,
  },
  {
    name: "EUR",
    symbol: <EuroSign />,
    id: `${Math.random()}-${Math.random()}`,
  },
  {
    name: "GBP",
    symbol: <SterlingSign />,
    id: `${Math.random()}-${Math.random()}`,
  },
  {
    name: "BTC",
    symbol: <BitcoinSign />,
    id: `${Math.random()}-${Math.random()}`,
  },
  {
    name: "ETH",
    symbol: <EthereumSign />,
    id: `${Math.random()}-${Math.random()}`,
  },
];
