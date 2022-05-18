import React, { createContext, FC, useContext, useMemo, useState } from 'react';
import { CHAIN_LIST_MAINNET } from '../utils/constants';
import { chooseAccount } from './methods/chooseAccount';
import { IChainList } from '../interface/ChainList';
import WalletProvider from './wallet';

interface IInitialState {
    chain: IChainList;
    account?: any;
    signedIn: boolean;
    setAccount: (chain: IChainList) => Promise<void>;
}

const store = createContext<any>({} as IInitialState);

const { Provider } = store;

const DEFAULT_CHAIN = CHAIN_LIST_MAINNET[0];

const StoreProvider: FC = ({ children }) => {
    const sessionStoreChain = sessionStorage.getItem('chain');

    const [chain, setChain] = useState<IChainList>(
        sessionStoreChain ? JSON.parse(sessionStoreChain) : DEFAULT_CHAIN,
    );
    const [account, setAcc] = useState(sessionStorage.getItem('address') || '');
    const [signedIn, setSignedIn] = useState<boolean>();

    const setAccount = async (chain: IChainList) => {
        sessionStorage.setItem('chain', JSON.stringify(chain));

        setChain(chain);

        const account = await chooseAccount(chain);

        setAcc(account.address);
        sessionStorage.setItem('address', account.address);
    };

    window.onload = () => {
        if (window.keplr) {
            setSignedIn(true);
            // setAccount(chain);
        } else {
            setSignedIn(false);
        }
    };

    const provider = useMemo(() => {
        return {
            setAccount,
            chain,
            account,
            signedIn,
        };
    }, [chain, account, signedIn]);

    return (
        <Provider value={provider}>
            <WalletProvider>{children}</WalletProvider>
        </Provider>
    );
};

export { store, StoreProvider };

export const useKepler = (): IInitialState => useContext(store);
