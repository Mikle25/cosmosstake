import React, { FC } from 'react';
import styled from 'styled-components';
import AppHeader from '../components/app/AppHeader';
import AppFooter from '../components/app/AppFooter';
import AppNavBar from '../components/app/AppNavBar';
import { CustomContainer } from '../components/styled/Container';
import cosmosImg from '../assets/img/cosmos.svg';

const Wrapper = styled.div`
    z-index: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    color: ${({ theme }) => theme.main};
    background: ${({ theme }) => theme.gradientBg};
    overflow: hidden;
    height: 100vh;

    &:after {
        content: '';
        position: absolute;
        bottom: 15%;
        right: 10%;
        width: 400px;
        height: 400px;
        background-image: url(${cosmosImg});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        opacity: 0.1;
        z-index: 0;
    }
    //background-size: 100% 400%;
    //
    //animation: anim 15s linear infinite;
    //
    //@keyframes anim {
    //    0% {
    //        background-position: 50% 0;
    //    }
    //    50% {
    //        background-position: 100% 50%;
    //    }
    //    100% {
    //        background-position: 50% 0;
    //    }
    //}
`;

const StakeWrapper = styled.div`
    z-index: 2;
    display: grid;
    justify-content: center;
    grid-template-columns: ${({ theme }) => theme.barAndLogo} 1fr;
    position: relative;
`;

const ContentWrapper = styled.div`
    overflow: auto;
    height: 90vh;
`;

const LayoutDefault: FC = ({ children }) => {
    return (
        <Wrapper>
            <AppHeader />

            <div>
                <CustomContainer>
                    <StakeWrapper>
                        <AppNavBar />

                        <ContentWrapper>
                            {children}
                            <AppFooter />
                        </ContentWrapper>
                    </StakeWrapper>
                </CustomContainer>
            </div>
        </Wrapper>
    );
};

export default LayoutDefault;
