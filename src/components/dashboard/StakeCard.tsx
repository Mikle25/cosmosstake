import React, { ChangeEvent, FC, useEffect, useMemo } from 'react';
import { Btn } from '../styled/Btn';
import LayoutModal from '../LayoutModal';
import LayoutCard from '../LayoutCard';
import styled, { useTheme } from 'styled-components';
import useShowModal from '../../hooks/useShowModal';
import { Input } from './StatsStyles';
import useApi from '../../hooks/useApi';
import useRequest from '../../hooks/useRequest';
import FormDelegate from '../forms/FormDelegate';
import { useKepler } from '../../store';
import { useWallet } from '../../store/wallet';
import Loader from '../Loader';
import { FlexCenter } from '../styled/Flex';

const InputWrap = styled.div`
    position: relative;

    & span {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        color: ${({ theme }) => theme.gray};
    }
`;

interface StakeCardProps {
    currBalance: string;
    availableBalance: string;
    handleChangeBalance: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IObjectKeys {
    [key: string]: string | number;
}

const listEverstakeAddress: IObjectKeys = {
    cosmos: 'cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3',
    ki: 'kivaloper1dm98ttse9xefpgfzvl2wnq6hcrhx8ndxd4stz8',
};

const StakeCard: FC<StakeCardProps> = (props) => {
    const { currBalance, handleChangeBalance, availableBalance } = props;
    const { chain, account } = useKepler();
    const { balanceLoading } = useWallet();
    const theme = useTheme();
    const { handleShow, show, handleClose } = useShowModal();
    const { API } = useApi();
    const { resp, request } = useRequest();

    const currEverstakeAddress = useMemo(() => {
        return listEverstakeAddress[chain.name.toLocaleLowerCase()];
    }, [chain]);

    useEffect(() => {
        request(API.getValidator, currEverstakeAddress);
    }, [chain]);

    const validatorInfo = useMemo(() => {
        if (!resp) return {};

        return resp.validator;
    }, [resp]);

    return (
        <>
            <LayoutCard
                title={'your available balance'}
                bg={theme.white}
                fontColor={theme.black}
            >
                {balanceLoading ? (
                    <FlexCenter>
                        <Loader color="black" />
                    </FlexCenter>
                ) : (
                    <InputWrap>
                        <Input
                            // type="number"
                            fontColor={theme.black}
                            borderColor={theme.black}
                            onChange={handleChangeBalance}
                            value={currBalance}
                        />

                        <span>{availableBalance}</span>
                    </InputWrap>
                )}

                <Btn
                    bg={theme.black}
                    fontColor={theme.white}
                    onClick={handleShow}
                    disabled={
                        !account ||
                        +availableBalance < +currBalance ||
                        !currBalance
                    }
                >
                    Stake now
                </Btn>

                <LayoutModal handleClose={handleClose} show={show}>
                    <FormDelegate
                        data={validatorInfo}
                        handleClose={handleClose}
                        currValue={currBalance}
                    />
                </LayoutModal>
            </LayoutCard>
        </>
    );
};

export default StakeCard;
