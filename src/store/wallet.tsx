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
import { RewardsResp } from '../components/dashboard/types';
import { IValidators } from '../interface/Validators';
import { IDelegatedProps } from '../interface/Delegate';

interface WalletInitState {
    balance: string;
    balanceLoading: boolean;
    updateBalance: () => Promise<void>;
    // getStakedValidators: () => Promise<void>;
    // isStaked: any[];
    // stakedLoading: boolean;
}

const WalletInitState = {
    balance: '0',
    balanceLoading: false,
    // stakedLoading: false,
};

const WalletContext = createContext({} as WalletInitState);

const WalletProvider: FC = ({ children }) => {
    const { account } = useKepler();
    const { API } = useApi();
    const [balance, setBalance] = useState(WalletInitState.balance);
    const [balanceLoading, setBalanceLoading] = useState(
        WalletInitState.balanceLoading,
    );
    // const [isStaked, setStaked] = useState([]);
    // const [stakedLoading, setStakedLoading] = useState(
    //     WalletInitState.stakedLoading,
    // );

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

    // const getStakedValidators = useCallback(async () => {
    //     try {
    //         setStakedLoading(true);
    //         const delegatedValidators = await API.getDelegatorValidators(
    //             account,
    //         );
    //         const rewards = await API.getReward(account);
    //         const staked = await API.getDelegations(account);
    //
    //         const all = delegatedValidators.data.validators.map(
    //             (elem: IValidators) => {
    //                 const rewardItem = rewards.data.rewards.find(
    //                     (item: RewardsResp) =>
    //                         item.validator_address === elem.operator_address,
    //                 );
    //
    //                 const stakedItem = staked.data.delegation_responses.find(
    //                     (item: IDelegatedProps) =>
    //                         item.delegation.validator_address ===
    //                         elem.operator_address,
    //                 );
    //                 return {
    //                     ...elem,
    //                     rewards: rewardItem,
    //                     staked: stakedItem,
    //                 };
    //             },
    //         );
    //
    //         setStaked(all);
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         setStakedLoading(false);
    //     }
    // }, [account]);

    useEffect(() => {
        if (account) {
            updateBalance();
            // getStakedValidators();
        }
    }, [account]);

    const value = useMemo(() => {
        return {
            balance,
            updateBalance,
            balanceLoading,
            // getStakedValidators,
            // isStaked,
            // stakedLoading,
        };
    }, [balance, balanceLoading]);
    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;

export const useWallet = (): WalletInitState => useContext(WalletContext);
