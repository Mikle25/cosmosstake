import {
    // calculateFee,
    coin,
    GasPrice,
    SigningStargateClient,
    // StdFee,
} from '@cosmjs/stargate';
import { useCallback, useState } from 'react';
import toastrHandle from '../utils/toastrHandle';
import { toast } from 'react-toastify';
import { useKepler } from '../store';

export interface IOption {
    from: string;
    to: string;
    amount: number;
    denom: string;
}

export interface IRedelegate {
    delegator: string;
    validatorFrom: string;
    validatorTo: string;
    amount: number;
    denom: string;
}

type TClaimProps = {
    delegate: string;
    validator: string;
};

const handleErr = (resp: any) => {
    if (resp.code === 0) {
        toast.success('Success!');
    } else {
        throw resp.rawLog;
    }
};

const useStargateSDK = () => {
    const { chain } = useKepler();
    const [isLoading, setLoading] = useState<boolean>(false);

    // const fee = calculateFee(
    //     200000,
    //     GasPrice.fromString(`0.012${chain.coinMinimalDenom}`),
    // );

    const client = useCallback(async (): Promise<SigningStargateClient> => {
        const offlineSigner = window.getOfflineSigner(chain.chainId);
        offlineSigner.signAmino = offlineSigner.signAmino || offlineSigner.sign;

        return await SigningStargateClient.connectWithSigner(
            chain.rpc,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString(`0.012${chain.coinMinimalDenom}`),
            },
        );
    }, [chain]);

    const Delegate = async ({ from, to, amount, denom }: IOption) => {
        const rpc = await client();

        try {
            setLoading(true);

            // const resp = await toastrHandle(
            //     rpc.delegateTokens(
            //         from,
            //         to,
            //         coin(Math.floor(amount), denom),
            //         'auto',
            //     ),
            // );

            const resp = await rpc.delegateTokens(
                from,
                to,
                coin(Math.floor(amount), denom),
                'auto',
            );

            handleErr(resp);

            return resp;
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Undelegate = async ({ from, to, amount, denom }: IOption) => {
        const rpc = await client();
        try {
            setLoading(true);
            const resp = await toastrHandle(
                rpc.undelegateTokens(
                    from,
                    to,
                    coin(Math.floor(amount), denom),
                    'auto',
                ),
            );

            handleErr(resp);
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    // const Claim = async ({ delegate, validator }: TClaimProps) => {
    //     const rpc = await client();
    //
    //     try {
    //         setLoading(true);
    //         const resp = await toastrHandle(
    //             rpc.withdrawRewards(delegate, validator, 'auto'),
    //         );
    //
    //         handleErr(resp);
    //     } catch (e: any) {
    //         toast.error(e);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const Redelegate = async ({
        delegator,
        validatorFrom,
        validatorTo,
        amount,
        denom,
    }: IRedelegate) => {
        const rpc = await client();

        const msg = {
            typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
            value: {
                delegatorAddress: delegator,
                validatorSrcAddress: validatorFrom,
                validatorDstAddress: validatorTo,
                amount: coin(amount, denom),
            },
        };

        try {
            setLoading(true);

            const resp = await toastrHandle(
                rpc.signAndBroadcast(delegator, [msg], 'auto'),
            );

            handleErr(resp);
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Claim = async (address: string, validatorsAddress: string[]) => {
        const rpc = await client();

        try {
            setLoading(true);

            const msg = validatorsAddress.map((elem) => {
                return {
                    typeUrl:
                        '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                    value: {
                        delegatorAddress: address,
                        validatorAddress: elem,
                    },
                };
            });

            const resp = await rpc.signAndBroadcast(address, msg, 'auto');

            handleErr(resp);

            return resp;
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // const Delegate = async ({ from, to, amount, denom }: IOption) => {
    //     const rpc = await client();
    //     const msg = {
    //         typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
    //         value: {
    //             delegatorAddress: from,
    //             validatorAddress: to,
    //             amount: coin(Math.floor(amount), denom),
    //         },
    //     };
    //
    //     const resp = await rpc.signAndBroadcast(from, [msg], 'auto');
    //     console.log(resp);
    // };

    return {
        isLoading,
        Delegate,
        Undelegate,
        Claim,
        Redelegate,
    };
};

export default useStargateSDK;
