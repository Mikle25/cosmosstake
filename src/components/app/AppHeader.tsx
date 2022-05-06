import React from 'react';
import styled from 'styled-components';
import { CustomContainer } from '../styled/Container';
import Box from '../styled/Box';
import logoDark from '../../assets/img/logo-dark.svg';
import logoLight from '../../assets/img/logo-light.svg';
import logoDarkHover from '../../assets/img/logo-dark-hover.svg';
import logoLightHover from '../../assets/img/logo-light-hover.svg';
import AppHeaderNav from './AppHeaderNav';
import { useThemeToggle } from '../../hooks/useThemeContext';

const TheHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding-top: ${({ theme }) => theme.paddingBHeader};
    height: 100%;
`;

const WrapperLogo = styled.div`
    width: ${({ theme }) => theme.barAndLogo};
    height: 40px;
    margin: 0 42px 0 32px;
`;

const LogoStyle = styled.div<{ themeName: string }>`
    width: 100%;
    height: 100%;

    //background-size: 100% 100%;
    background-image: ${({ themeName }) =>
        themeName === 'dark' ? `url(${logoDark})` : `url(${logoLight})`};
    background-repeat: no-repeat;

    transition: background 0.2s linear;

    &:hover {
        background-image: ${({ themeName }) =>
            themeName === 'dark'
                ? `url(${logoDarkHover})`
                : `url(${logoLightHover})`};
    }
`;

const AppHeader = () => {
    const { themeName } = useThemeToggle();
    return (
        <Box>
            <CustomContainer>
                <TheHeader>
                    <WrapperLogo>
                        <LogoStyle themeName={themeName} />
                    </WrapperLogo>

                    <AppHeaderNav />
                </TheHeader>
            </CustomContainer>
        </Box>
    );
};

export default AppHeader;
