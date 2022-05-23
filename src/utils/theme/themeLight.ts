import colors from './colors';
import fs from './fs';
import gradient from './gradient';
import border from './border';
import size from './size';
import transition from './transition';

export default {
    ...colors.colorsLight,
    ...fs,
    ...gradient.gradientLight,
    ...border.borderLight,
    ...size,
    ...transition,
};
