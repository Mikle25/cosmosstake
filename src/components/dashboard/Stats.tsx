import React, { FC } from 'react';
import styled from 'styled-components';

const StatsWrapper = styled.div`
    height: 300px;
    margin: 20px ${({ theme }) => theme.marginContainer};
    border: 1px solid red;
`;

const Stats: FC = () => {
    return <StatsWrapper>Stats</StatsWrapper>;
};

export default Stats;
