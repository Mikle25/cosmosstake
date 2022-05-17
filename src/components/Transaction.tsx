import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FlexJustifyBetween } from './styled/Flex';
import { ellipsis } from '../utils/helpers';
import { TrxResp } from '../hooks/useGetExplorerTrx';
import { Text } from './styled/Text';

type TrxStyleProps = {
    color: string;
    bgColor: string;
};

interface TransactionProps extends TrxResp {
    styles?: TrxStyleProps | any;
}

const LinkTrxStyle = styled.a<TrxStyleProps>`
    padding: 5px;

    color: ${({ theme, color }) => color ?? theme.white};
    background-color: ${({ theme, bgColor }) => bgColor ?? theme.black};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fs14};

    &:hover {
        color: ${({ theme, color }) => color ?? theme.white};
    }
`;

const Transaction = (props: TransactionProps) => {
    const theme = useTheme();
    const { trx, linkTrx, styles } = props;

    return (
        <FlexJustifyBetween>
            <Text color={theme.gray} fs={theme.fs14}>
                Transaction hash: {ellipsis(trx)}
            </Text>
            <LinkTrxStyle
                href={linkTrx}
                target="_blank"
                rel="noreferrer"
                {...styles}
            >
                Open THASH
            </LinkTrxStyle>
        </FlexJustifyBetween>
    );
};

export default Transaction;
