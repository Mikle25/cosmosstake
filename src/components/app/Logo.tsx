import React from 'react';
import styled from 'styled-components';
import logoDark from '../../assets/img/logo-dark.svg';
import logoLight from '../../assets/img/logo-light.svg';
import logoDarkHover from '../../assets/img/logo-dark-hover.svg';
import logoLightHover from '../../assets/img/logo-light-hover.svg';
import { useThemeToggle } from '../../hooks/useThemeContext';

interface ILogoProps {
    height: string;
    margin: string;
}

const WrapperLogo = styled.div<Partial<ILogoProps>>`
    width: ${({ theme }) => theme.barAndLogo};
    height: ${({ height }) => height ?? '40px'};
    margin: ${({ margin }) => margin ?? '0 42px 0 32px'};
`;

const LogoStyle = styled.div<{ themeName: string }>`
    width: 100%;
    height: 100%;

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

const Logo = (props: Partial<ILogoProps>) => {
    const { themeName } = useThemeToggle();

    return (
        <WrapperLogo {...props}>
            <LogoStyle themeName={themeName} />
        </WrapperLogo>
    );
};

export default Logo;
