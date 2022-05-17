import styled from 'styled-components';

interface ITextProps {
    fs: string;
    color: string;
    textTransform: 'uppercase' | 'lowercase';
}

const Text = styled.div<Partial<ITextProps>>`
    font-weight: 400;
    font-size: ${({ theme, fs }) => fs ?? theme.fs14};
    color: ${({ theme, color }) => color ?? theme.main};
    text-transform: ${({ textTransform }) => textTransform ?? 'uppercase'};
`;

const Title = styled.div<Partial<ITextProps>>`
    //font-size: ${({ theme, fs }) => fs ?? theme.fs20};
    color: ${({ theme, color }) => color ?? theme.main};
    text-transform: ${({ textTransform }) => textTransform ?? 'uppercase'};
`;

export { Text, Title };
