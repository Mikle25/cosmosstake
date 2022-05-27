import React, { FC, useEffect, useMemo, useState } from 'react';
import { Input } from './StatsStyles';
import { Btn } from '../styled/Btn';
import LayoutCard from '../LayoutCard';
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
import { RewardsResp } from './types';

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
            validators.request(API.getDelegatorValidators, account);
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
            <LayoutCard
                title={'your rewards'}
                bg={theme.black}
                fontColor={theme.white}
            >
                {isLoading ? (
                    <FlexCenter>
                        <Loader color="white" />
                    </FlexCenter>
                ) : (
                    <div>
                        <Input
                            fontColor={theme.white}
                            borderColor={'rgba(255, 255, 255, 0.5)'}
                            value={rewardsInput}
                            readOnly
                        />
                    </div>
                )}

                <Btn
                    bg={theme.lightGreen}
                    fontColor={theme.black}
                    onClick={handleShow}
                    disabled={!account}
                >
                    Claim reward
                </Btn>
            </LayoutCard>

            <LayoutModal
                handleClose={handleClose}
                show={show}
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
