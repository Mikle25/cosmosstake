import React, {
    FC,
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
    useCallback,
} from 'react';
import useApi from '../hooks/useApi';
import { useKepler } from './index';
import { convertMutezToInt } from '../utils/helpers';
import useRequest from '../hooks/useRequest';

interface WalletInitState {
    balance: string;
    balanceLoading: boolean;
    updateBalance: () => void;
}

const WalletInitState = {
    balance: '0',
    balanceLoading: false,
};

const WalletContext = createContext({} as WalletInitState);

const WalletProvider: FC = ({ children }) => {
    const { account } = useKepler();
    const { API } = useApi();
    const [balance, setBalance] = useState(WalletInitState.balance);
    const [balanceLoading, setBalanceLoading] = useState(
        WalletInitState.balanceLoading,
    );

    const updateBalance = useCallback(async () => {
        try {
            setBalanceLoading(true);
            const bal = await API.getBalance(account);

            if (bal.data.balances[0]) {
                setBalance(`${convertMutezToInt(bal.data.balances[0].amount)}`);
            } else {
                setBalance('0');
            }
        } catch (e: any) {
            console.error(e);
            setBalance('0');
        } finally {
            setBalanceLoading(false);
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            updateBalance();
        }
    }, [account]);

    const value = useMemo(() => {
        return { balance, updateBalance, balanceLoading };
    }, [balance, balanceLoading]);
    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;

export const useWallet = (): WalletInitState => useContext(WalletContext);
