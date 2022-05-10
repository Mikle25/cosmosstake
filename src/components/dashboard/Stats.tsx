import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Calclulate from '../Calclulate';
import StatsEachInfo from './StatsEachInfo';
import { Text } from '../styled/Text';
import { useWallet } from '../../store/wallet';
import {
    convertMutezToInt,
    formatMinimalDenomToCoinDenom,
} from '../../utils/helpers';
import { useKepler } from '../../store';

interface StyleProps {
    bg: string;
    fontColor: string;
    borderColor: string;
}

const StatsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 350px) 1fr;
    gap: 25px;

    margin: 20px ${({ theme }) => theme.marginContainer};
`;

const Input = styled.input<Partial<StyleProps>>`
    padding: 5px 11px;

    background: transparent;
    font-size: ${({ theme }) => theme.fs36};
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: ${({ borderColor }) => borderColor};
    color: ${({ fontColor }) => fontColor};

    &:focus-visible {
        outline: none;
    }
`;

const Btn = styled.button<Partial<StyleProps>>`
    background: ${({ bg }) => bg};
    padding: 16px 10px;
    text-transform: uppercase;
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ theme }) => theme.fs18};

    &:disabled {
        opacity: 0.5;
    }
`;

const FlexVerticalCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`;

const ConvertToUSD = styled.div<{ color?: string; bgColor?: string }>`
    padding: 4px 8px;
    width: fit-content;
    font-size: ${({ theme }) => theme.fs14};
    color: ${({ theme, color }) => color ?? theme.black};
    background: ${({ theme, bgColor }) => bgColor ?? theme.black};
`;

const Stats: FC = () => {
    const theme = useTheme();
    const { balance } = useWallet();
    const [currBalance, setCurrBalance] = useState(balance);

    useEffect(() => {
        setCurrBalance(balance);
    }, [balance]);

    const handleChangeBalance = (e: ChangeEvent<HTMLInputElement>) => {
        if (isFinite(+e.target.value)) {
            setCurrBalance(e.target.value);
        }
    };

    return (
        <>
            <StatsWrapper>
                <div>
                    <Calclulate
                        title={'your rewards'}
                        bg={theme.black}
                        fontColor={theme.white}
                    >
                        <Input
                            fontColor={theme.white}
                            borderColor={'rgba(255, 255, 255, 0.5)'}
                            value="10000"
                        />
                        <Btn bg={theme.lightGreen} fontColor={theme.black}>
                            Claim reward
                        </Btn>
                    </Calclulate>
                </div>

                <div>
                    <Calclulate
                        title={'your available balance'}
                        bg={theme.white}
                        fontColor={theme.black}
                    >
                        <Input
                            // type="number"
                            fontColor={theme.black}
                            borderColor={theme.black}
                            onChange={handleChangeBalance}
                            value={currBalance}
                        />
                        <Btn bg={theme.black} fontColor={theme.white}>
                            Stake now
                        </Btn>
                    </Calclulate>
                </div>

                <FlexVerticalCenter>
                    <StatsEachInfo title={'monthly earning'} amount={'10000'}>
                        <ConvertToUSD bgColor={theme.lightGreen}>
                            $100
                        </ConvertToUSD>
                    </StatsEachInfo>
                    <StatsEachInfo title={'yearly earning'} amount={'2323232'}>
                        <ConvertToUSD bgColor={theme.lightGreen}>
                            $100
                        </ConvertToUSD>
                    </StatsEachInfo>
                </FlexVerticalCenter>

                <StatsEachInfo title={'unbonding tokens'} amount={'300402'}>
                    <ConvertToUSD color={theme.lightGreen}>$100</ConvertToUSD>
                </StatsEachInfo>
                <StatsEachInfo title={'staked tokens'} amount={'1023002'}>
                    <ConvertToUSD color={theme.lightGreen}>$100</ConvertToUSD>
                </StatsEachInfo>
                <StatsEachInfo title={'current yield'}>
                    <Text fs={'36px'}>15%</Text>
                </StatsEachInfo>
            </StatsWrapper>
        </>
    );
};

export default Stats;
