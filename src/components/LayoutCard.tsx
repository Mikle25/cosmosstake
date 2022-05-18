import React, { FC } from 'react';
import styled from 'styled-components';

type LayoutCardProps = {
    title: string;
    bg: string;
    fontColor: string;
};

const LayoutCardWrap = styled.div<{ bg: string; fsColor: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 30px 35px;
    width: 350px;
    min-height: 220px;

    background: ${({ bg }) => bg};
    color: ${({ fsColor }) => fsColor};
`;

const LayoutCardTitle = styled.div`
    font-size: ${({ theme }) => theme.fs16};
    text-transform: uppercase;
`;

const LayoutCard: FC<LayoutCardProps> = (props) => {
    const { children, title, bg, fontColor } = props;

    return (
        <LayoutCardWrap bg={bg} fsColor={fontColor}>
            <LayoutCardTitle>{title}</LayoutCardTitle>
            {children}
        </LayoutCardWrap>
    );
};

export default LayoutCard;
