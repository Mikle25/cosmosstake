import styled from 'styled-components';
import { Flex } from './Flex';
import { StyleProps } from './types';

interface BtnProps extends StyleProps {
    variant: 'main' | 'secondary' | 'default' | 'disabled' | 'active';
    bgColor: string;
}

const WrapperBtn = styled(Flex)<Partial<BtnProps>>`
    justify-content: center;
    margin: 0 -2.5rem;
    padding: 1rem 0;
    background: ${({ theme, bgColor }) => bgColor ?? theme.gray100};
`;

const Btn = styled.button<Partial<BtnProps>>`
    min-width: ${({ variant }) => {
        if (variant === 'default') return 'fit-content';
        return '250px';
    }};
    padding: ${({ variant }) => {
        if (variant === 'default') return '5px';
        return '16px 10px';
    }};

    background: ${({ theme, bg, variant }) => {
        if (variant === 'default') return theme.black;
        if (variant === 'active') return theme.lightGreen;
        return bg || theme.main;
    }};
    text-transform: uppercase;
    color: ${({ theme, fontColor, variant }) => {
        if (variant === 'default') return theme.white;
        return fontColor || theme.secondary;
    }};
    font-size: ${({ theme, variant }) => {
        if (variant === 'default') return theme.fs14;
        return theme.fs18;
    }};

    &:disabled {
        opacity: 0.5;
    }
`;

const BtnAmount = styled.div``;

export { WrapperBtn, Btn };
