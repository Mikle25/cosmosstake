import React, {
    createContext,
    FC,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { ThemeProvider as SourceProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import GlobalStyles from '../components/styled/GlobalStyles';
import theme from '../utils/theme';
import themeLight from '../utils/theme/themeLight';
import themeDark from '../utils/theme/themeDark';

export type ThemeName = 'light' | 'dark';

export type ThemeProps = {
    themeName: ThemeName;
};

export type ThemeContext = {
    toggleTheme: () => void;
    themeName: ThemeName;
};

const themeMap: any = {
    light: themeLight,
    dark: themeDark,
};

export const ThemeToggleContext = createContext({} as ThemeContext);

const DEFAULT_THEME = 'dark';

export enum THEME {
    light = 'light',
    dark = 'dark',
}

const ThemeProvider: FC = ({ children }) => {
    const [themeName, setThemeName] = useState<any>(
        localStorage.getItem('theme') || DEFAULT_THEME,
    );

    const toggleTheme = useCallback(() => {
        const toggledThemeName = themeName === 'light' ? 'dark' : 'light';
        setThemeName(toggledThemeName);
        localStorage.setItem('theme', toggledThemeName);
    }, [themeName]);

    const value = useMemo(
        () => ({
            toggleTheme,
            themeName,
        }),
        [themeName, toggleTheme],
    );

    return (
        <ThemeToggleContext.Provider value={value}>
            <Normalize />
            <SourceProvider theme={themeMap[themeName]}>
                <GlobalStyles />
                {children}
            </SourceProvider>
        </ThemeToggleContext.Provider>
    );
};

export default ThemeProvider;
