import React, { FC, useEffect, useMemo, useState } from 'react';
import { Input } from './StatsStyles';
import { Btn } from '../styled/Btn';
import Calclulate from '../Calclulate';
import { useTheme } from 'styled-components';
import useShowModal from '../../hooks/useShowModal';
import LayoutModal from '../LayoutModal';
import { useKepler } from '../../store';
import useRequest from '../../hooks/useRequest';
import useApi from '../../hooks/useApi';
import {
    convertMutezToInt,
    formatMinimalDenomToCoinDenom,
} from '../../utils/helpers';
import Loader from '../Loader';
import { FlexCenter } from '../styled/Flex';
import FormClaim from '../forms/FormClaim';
import { IValidators } from '../../interface/Validators';
import { useWallet } from '../../store/wallet';

export interface RewardsResp {
    reward: Array<{
        denom: string;
        amount: string;
    }>;
    validator_address: string;
}

export interface ValidatorRewardResp {
    validatorName: string;
    address: string | string[];
    value: string;
}

const RewardsCard: FC = () => {
    const theme = useTheme();
    const { account } = useKepler();
    const { balance } = useWallet();
    const { resp, request, isLoading } = useRequest();
    const { API } = useApi();
    const { handleClose, handleShow, show } = useShowModal();
    const [rewardsInput, setRewardsInput] = useState('0');
    const validators = useRequest();

    useEffect(() => {
        if (account) {
            request(API.getReward, account);
            validators.request(API.getValidators);
        }
    }, [account, balance]);

    const rewards = useMemo(() => {
        if (!Object.keys(resp).length) return [];

        if (!resp.total[0]?.amount) {
            setRewardsInput('0');
        } else {
            setRewardsInput(
                `${convertMutezToInt(Math.floor(resp.total[0]?.amount))}`,
            );
        }

        return resp.rewards;
    }, [resp]);

    const allValidators = useMemo((): Array<IValidators> => {
        if (!validators.resp?.validators) return [];
        return validators.resp.validators;
    }, [validators.resp]);

    const validatorsRewards = useMemo(() => {
        if (!allValidators.length && !rewards.length) return [];

        const addresses: string[] = [];

        const res = rewards.map((e: RewardsResp) => {
            if (!e.reward.length) return;

            addresses.push(e.validator_address);

            const result = allValidators.find((i) => {
                if (e.reward.length) {
                    return e.validator_address === i.operator_address;
                }
            });

            return {
                validatorName: result?.description?.moniker,
                value: formatMinimalDenomToCoinDenom(e.reward[0]?.amount),
                address: [e.validator_address],
            };
        });

        const allRewards = {
            validatorName: 'ALL',
            address: addresses,
            value: rewardsInput,
        };

        return [allRewards, ...res];
    }, [allValidators, rewards]);

    return (
        <>
            <Calclulate
                title={'your rewards'}
                bg={theme.black}
                fontColor={theme.white}
            >
                {isLoading || !Object.keys(rewards).length ? (
                    <FlexCenter>
                        <Loader color="white" />
                    </FlexCenter>
                ) : (
                    <Input
                        fontColor={theme.white}
                        borderColor={'rgba(255, 255, 255, 0.5)'}
                        value={rewardsInput}
                        readOnly
                    />
                )}

                <Btn
                    bg={theme.lightGreen}
                    fontColor={theme.black}
                    onClick={handleShow}
                >
                    Claim reward
                </Btn>
            </Calclulate>

            <LayoutModal
                handleClose={handleClose}
                show={show}
                title={'Claim rewards'}
                styles={{ bg: theme.gray100, color: theme.white }}
            >
                <FormClaim
                    data={validatorsRewards}
                    totalRewords={rewardsInput}
                />
            </LayoutModal>
        </>
    );
};

export default RewardsCard;
