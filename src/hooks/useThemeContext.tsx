import { ThemeToggleContext, ThemeContext } from '../store/theme';
import { useContext } from 'react';

export const useThemeToggle = (): ThemeContext => {
    return useContext(ThemeToggleContext);
};
