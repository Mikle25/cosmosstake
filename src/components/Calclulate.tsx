import React, { FC } from 'react';
import styled from 'styled-components';

type CalcProps = {
    title: string;
    bg: string;
    fontColor: string;
};

const CalculateWrapper = styled.div<{ bg: string; fsColor: string }>`
    display: grid;
    //flex-direction: column;
    grid-template-rows: 0.5fr 30% 1fr;
    gap: 10%;
    padding: 30px 35px;
    width: 350px;

    background: ${({ bg }) => bg};
    color: ${({ fsColor }) => fsColor};
`;

const CalculateTitle = styled.h5`
    font-size: ${({ theme }) => theme.fs16};
    text-transform: uppercase;
`;

const Calculate: FC<CalcProps> = (props) => {
    const { children, title, bg, fontColor } = props;

    return (
        <CalculateWrapper bg={bg} fsColor={fontColor}>
            <CalculateTitle>{title}</CalculateTitle>
            {children}
        </CalculateWrapper>
    );
};

export default Calculate;
