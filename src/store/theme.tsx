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
import { Theme } from '../utils/theme/types';

// declare const themeDefault: {
//     activeBorderNav: string;
//     barAndLogo: string;
//     black: string;
//     blue: any;
//     defaultBorderNav: string;
//     divider: string;
//     error: string;
//     fs14: string;
//     fs16: string;
//     fs18: string;
//     fs20: string;
//     fs22: string;
//     fs24: string;
//     fs28: string;
//     fs30: string;
//     fs32: string;
//     fs34: string;
//     fs36: string;
//     fs38: string;
//     fs40: string;
//     gradientBg: string;
//     gradientCard: string;
//     gradientNav: string;
//     gradientTableHead: string;
//     gray: string;
//     gray100: string;
//     headerNavLink: string;
//     lightGreen: string;
//     main: string;
//     marginContainer: string;
//     paddingBHeader: string;
//     secondary: string;
//     table: any;
//     transitionCustom: <T>(props: T) => string;
//     white: string;
// };
//
// export declare type Theme = typeof themeDefault;
// declare module 'styled-components' {
//     interface DefaultTheme extends Theme {}
// }

export type ThemeProps = {
    themeName: string;
};

export type ThemeContext = {
    toggleTheme: () => void;
    themeName: string;
};

const themeMap: Record<string, Theme> = {
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
    const [themeName, setThemeName] = useState(
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
