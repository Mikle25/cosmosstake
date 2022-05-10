import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { useThemeToggle } from '../../hooks/useThemeContext';
import { useKepler } from '../../store';
import { formatMinimalDenomToCoinDenom } from '../../utils/helpers';

interface StatsEachInfoProps {
    title: string;
    amount?: string;
}

const StatsEachInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-left: 25px;
`;

const Title = styled.h5<{ isTheme: string }>`
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fs14};
    color: ${({ theme, isTheme }) =>
        isTheme === 'dark' ? theme.gray : theme.white};
`;

const AmountStyle = styled.span`
    color: ${({ theme }) => theme.main};
    font-size: ${({ theme }) => theme.fs20};
`;

const StatsEachInfo: FC<StatsEachInfoProps> = (props) => {
    const { amount, title, children } = props;
    const { themeName } = useThemeToggle();
    const { chain } = useKepler();

    return (
        <StatsEachInfoWrapper>
            <Title isTheme={themeName}>{title}</Title>
            {amount && (
                <AmountStyle>
                    {formatMinimalDenomToCoinDenom(amount, chain.coinDenom)}
                </AmountStyle>
            )}
            {children}
        </StatsEachInfoWrapper>
    );
};

export default StatsEachInfo;
