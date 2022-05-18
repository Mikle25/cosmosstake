import styled from 'styled-components';
import { StyleProps } from '../styled/types';
import { Text } from '../styled/Text';

export const Input = styled.input<Partial<StyleProps>>`
    width: 100%;
    height: 100%;

    background: transparent;
    font-size: ${({ theme }) => theme.fs36};
    border-bottom-style: solid;
    border-bottom-width: ${({ theme }) => theme.borderWidth};
    border-bottom-color: ${({ borderColor }) => borderColor};
    color: ${({ fontColor }) => fontColor};

    &:focus-visible {
        outline: none;
    }
`;

export const ConvertToUSD = styled.div<
    Partial<{ color: string; bgColor: string }>
>`
    padding: 4px 8px;
    width: fit-content;
    font-size: ${({ theme }) => theme.fs14};
    color: ${({ theme, color }) => color ?? theme.black};
    background: ${({ theme, bgColor }) => bgColor ?? theme.black};
`;

export const TextWrap = styled(Text)<{ color: string }>`
    & svg {
        fill: ${({ color }) => color};
    }
`;
