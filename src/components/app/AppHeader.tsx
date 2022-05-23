import React from 'react';
import styled from 'styled-components';
import { CustomContainer } from '../styled/Container';

import AppHeaderNav from './AppHeaderNav';
import Logo from './Logo';

const TheHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding-top: ${({ theme }) => theme.paddingBHeader};
    height: 100%;
`;

const AppHeader = () => {
    return (
        <div>
            <CustomContainer>
                <TheHeader>
                    <Logo />

                    <AppHeaderNav />
                </TheHeader>
            </CustomContainer>
        </div>
    );
};

export default AppHeader;
