import { IChainList } from '../interface/ChainList';
import CosmosIcon from '../components/styled/icons/CosmosIcon';
import KichainIcon from '../components/styled/icons/KichainIcon';

export const CHAIN_LIST_MAINNET: IChainList[] = [
    {
        name: 'cosmos',
        chainId: 'cosmoshub-4',
        coinMinimalDenom: 'uatom',
        coinDenom: 'ATOM',
        icon: CosmosIcon,
        rpc: 'https://rpc-cosmos.everstake.one',
        rest: 'https://lcd-cosmos.everstake.one',
        // rest: 'https://api.cosmos.network',
    },
    {
        name: 'Ki',
        chainId: 'kichain-2',
        coinDenom: 'XKI',
        coinMinimalDenom: 'uxki',
        icon: KichainIcon,
        rpc: 'https://kichain-node.everstake.one/rpc/',
        rest: 'https://kichain-node.everstake.one/api',
    },
    // {
    //     name: 'osmosis',
    //     chainId: 'osmosis',
    //     coinMinimalDenom: 'uosmo',
    //     coinDenom: 'OSMO',
    //     rest: 'https://ki.api.ping.pub',
    //     rpc: 'https://rpc-osmosis.itastakers.com',
    // },
    // {
    //     name: 'kava',
    //     chainId: 'kava',
    //     coinMinimalDenom: 'ukava',
    //     coinDenom: 'KAVA',
    //     rest: 'https://lcd-kava.keplr.app',
    //     rpc: 'https://rpc.kava.io',
    // },
];

export const CHAIN_LIST_TESTNET = [
    {
        name: 'vega-testnet',
        chainId: 'vega-testnet',
        coinMinimalDenom: 'uatom',
        coinDenom: 'ATOM',
        rest: 'http://198.50.215.1:3327',
        rpc: 'http://198.50.215.1:36657',
    },
];
