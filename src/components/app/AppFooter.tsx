import React from 'react';
import styled from 'styled-components';
import { CustomContainer } from '../styled/Container';

const CustomBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: white;
    position: sticky;
    top: 100%;
`;

const AppFooter = () => {
    const isYear = new Date().getFullYear();

    return (
        <CustomBox color="transparent">
            <CustomContainer>
                <span>© Everstake {isYear}. All rights reserved.</span>
            </CustomContainer>
        </CustomBox>
    );
};

export default AppFooter;
