import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { useThemeToggle } from '../../hooks/useThemeContext';
import { useKepler } from '../../store';
import { formatMinimalDenomToCoinDenom } from '../../utils/helpers';
import Loader from '../Loader';

interface StatsEachInfoProps {
    title: string;
    amount?: string;
    isLoading?: boolean;
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
    const { amount, title, children, isLoading } = props;
    const theme = useTheme();
    const { themeName } = useThemeToggle();
    const { chain } = useKepler();

    return (
        <StatsEachInfoWrapper>
            <Title isTheme={themeName}>{title}</Title>
            {isLoading ? (
                <Loader fs={theme.fs20} />
            ) : (
                amount && (
                    <AmountStyle>
                        {amount} {chain.coinDenom}
                    </AmountStyle>
                )
            )}
            {children}
        </StatsEachInfoWrapper>
    );
};

export default StatsEachInfo;
