import size from './size';

export default {
    borderLight: {
        defaultBorderNav: `${size.borderWidth} solid rgba(255, 255, 255, 1)`,
        activeBorderNav: `${size.borderWidth} solid #000`,
    },
    borderDark: {
        defaultBorderNav: `${size.borderWidth} solid rgba(255, 255, 255, 0.1)`,
        activeBorderNav: `${size.borderWidth} solid #E5FF80`,
    },
    defaultBorderNav: `${size.borderWidth} solid rgba(255, 255, 255, 0.1)`,
    activeBorderNav: `${size.borderWidth} solid #E5FF80`,
};
