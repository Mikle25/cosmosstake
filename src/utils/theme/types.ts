import { DefaultTheme } from 'styled-components';

declare const themeDefault: {
    activeBorderNav: string;
    barAndLogo: string;
    black: string;
    blue: any;
    defaultBorderNav: string;
    divider: string;
    error: string;
    fs14: string;
    fs16: string;
    fs18: string;
    fs20: string;
    fs22: string;
    fs24: string;
    fs28: string;
    fs30: string;
    fs32: string;
    fs34: string;
    fs36: string;
    fs38: string;
    fs40: string;
    gradientBg: string;
    gradientCard: string;
    gradientNav: string;
    gradientTableHead: string;
    gray: string;
    gray100: string;
    headerNavLink: string;
    lightGreen: string;
    main: string;
    marginContainer: string;
    paddingBHeader: string;
    secondary: string;
    table: any;
    transitionCustom: <T>(props: T) => string;
    white: string;
    borderWidth: string;
};

export declare type Theme = typeof themeDefault;
declare module 'styled-components' {
    interface DefaultTheme extends Theme {}
}
