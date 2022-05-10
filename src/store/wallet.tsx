import React, {
    FC,
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from 'react';
import useApi from '../hooks/useApi';
import useRequest from '../hooks/useRequest';
import { useKepler } from './index';
import { convertMutezToInt } from '../utils/helpers';

type Balances = {
    amount: string;
};

interface WalletInitState {
    balance: string;
}

const WalletContext = createContext({} as WalletInitState);

const WalletProvider: FC = ({ children }) => {
    const { account } = useKepler();
    const { API } = useApi();
    const getBalance = useRequest();

    useEffect(() => {
        if (account) {
            getBalance.request(API.getBalance, account);
        }
    }, [account]);

    const balance = useMemo(() => {
        if (!getBalance.resp.balances) return '0';

        return `${convertMutezToInt(getBalance.resp.balances[0].amount)}`;
    }, [getBalance.resp]);

    const value = useMemo(() => {
        return { balance };
    }, [balance]);
    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;

export const useWallet = (): WalletInitState => useContext(WalletContext);
