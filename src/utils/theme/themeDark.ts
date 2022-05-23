import colors from './colors';
import fs from './fs';
import gradient from './gradient';
import border from './border';
import size from './size';
import transition from './transition';

export default {
    ...colors.colorsDark,
    ...fs,
    ...gradient.gradientDark,
    ...border.borderDark,
    ...size,
    ...transition,
};
