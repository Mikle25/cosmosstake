import React from 'react';
import styled from 'styled-components';
import { FlexCenter } from './styled/Flex';

interface LoaderProps {
    fs?: string;
    color?: string;
    padding?: string;
}

function template(i: number) {
    return `
&:nth-child(${i + 1}) {
        animation-delay: ${i / 5}s
    }`;
}

function anim() {
    let st = '';

    for (let i = 0; i <= 6; i += 1) {
        st += template(i);
    }

    return st;
}

const LoadingText = styled.div<LoaderProps>`
    width: 100%;
    height: 100%;

    & span {
        display: inline-block;
        margin: 0 5px;
        color: ${({ theme, color }) => color ?? theme.main};
        filter: blur(0px);
        animation: bluer 2s infinite linear alternate;

        ${anim()}

        @keyframes bluer {
            0% {
                filter: blur(0px);
            }
            100% {
                filter: blur(4px);
            }
        }
    }
`;

const LoaderWrap = styled(FlexCenter)<LoaderProps>`
    padding: ${({ padding }) => padding ?? '0'};
`;

const Loader = (props: LoaderProps) => {
    return (
        <LoaderWrap {...props}>
            <LoadingText {...props}>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </LoadingText>
        </LoaderWrap>
    );
};

export default Loader;
