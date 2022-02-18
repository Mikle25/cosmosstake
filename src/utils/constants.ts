import { IChainList } from '../interface/ChainList';

export const CHAIN_LIST_MAINNET: IChainList[] = [
    {
        name: 'Ki',
        chainId: 'kichain-2',
        coinDenom: 'XKI',
        coinMinimalDenom: 'uxki',
        rpc: 'https://rpc-mainnet.blockchain.ki',
        rest: 'https://api-mainnet.blockchain.ki',
    },
    // {
    //     name: 'cosmos',
    //     chainId: 'cosmoshub',
    //     coinMinimalDenom: 'uatom',
    //     coinDenom: 'ATOM',
    //     rpc: 'https://rpc-cosmoshub.keplr.app',
    //     rest: 'https://lcd-cosmoshub.keplr.app',
    // },
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
    {
        name: 'Photon-testnet',
        chainId: 'cosmoshub-testnet',
        coinMinimalDenom: 'uphoton',
        coinDenom: 'PHOTON',
        rpc: 'https://rpc.testnet.cosmos.network:443',
        rest: 'https://api.testnet.cosmos.network:443',
    },
];
