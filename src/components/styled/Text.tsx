import styled from 'styled-components';

interface ITextProps {
    fs?: string;
    color?: string;
}

const Text = styled.span<ITextProps>`
    font-weight: 400;
    font-size: ${({ theme, fs }) => fs ?? theme.fs16};
    color: ${({ theme, color }) => color ?? theme.main};
`;

export { Text };
