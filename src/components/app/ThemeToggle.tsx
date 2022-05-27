import React, { FC } from 'react';
import styled from 'styled-components';
import { useThemeToggle } from '../../hooks/useThemeContext';
import { ThemeProps } from '../../store/theme';
import MoonIcon from '../styled/icons/MoonIcon';
import SunIcon from '../styled/icons/SunIcon';

const ThemeTogglerStyle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Moon = styled.div<ThemeProps>`
    cursor: pointer;

    & svg {
        fill: ${({ theme, themeName }) =>
            themeName === 'dark' ? theme.lightGreen : theme.white};
    }
`;

const Sun = styled.div<ThemeProps>`
    cursor: pointer;

    & svg {
        fill: ${({ theme, themeName }) =>
            themeName === 'light' ? theme.lightGreen : theme.white};
    }
`;

const Switcher = styled.div<ThemeProps>`
    position: relative;
    width: 50px;
    height: 20px;
    color: white;
    cursor: pointer;

    &:after {
        content: '';
        position: absolute;
        width: 20px;
        height: 100%;
        border-radius: 50%;
        background: yellow;
        left: ${({ themeName }) => (themeName === 'dark' ? 0 : '100%')};
        transform: translateX(
            ${({ themeName }) => (themeName === 'dark' ? 0 : '-100%')}
        );

        transition: ${({ theme }) => theme.transitionCustom('all')};
    }

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        border-radius: 2.5px;
        background: rgba(255, 255, 255, 0.5);
        top: 50%;
        transform: translateY(-50%);
    }
`;

const ThemeToggle: FC = () => {
    const { themeName, toggleTheme } = useThemeToggle();

    return (
        <ThemeTogglerStyle onClick={toggleTheme}>
            <Moon themeName={themeName}>
                <MoonIcon />
            </Moon>

            <Switcher themeName={themeName} />

            <Sun themeName={themeName}>
                <SunIcon />
            </Sun>
        </ThemeTogglerStyle>
    );
};

export default ThemeToggle;
