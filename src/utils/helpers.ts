import numeral from 'numeral';
import moment from 'moment';

const tokenMutez = 1000000;
const tokenFormat = '0,0.[0000]';

export const formatPercent = (value: string | number | bigint): string => {
    return `${numeral(Number(value) * 100).format('0.0')}%`;
};

export const capitalizeLetters = (text: string): string => {
    if (!text) return '';
    return text.toLocaleUpperCase();
};

export const convertIntToMutez = (amount: number | string): number => {
    return +amount * tokenMutez;
};

export const convertMutezToInt = (amount: number | string): number => {
    return +amount / tokenMutez;
};

export const ellipsis = (string: string, start = 5, end = -5): string => {
    if (!string) return '';
    return `${string.substr(0, start)}...${string.substr(end)}`;
};

export const formatMinimalDenomToCoinDenom = (
    val: number | string,
    coinDenom = '',
): string => {
    const value = Number(val);

    if (!value) return `0 ${coinDenom}`;
    else if (value > 1000 * tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            '0,[]',
        )} ${coinDenom}`;
    } else if (value > 100 * tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            '0,0.[00]',
        )} ${coinDenom}`;
    } else if (value > 10 * tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            tokenFormat,
        )} ${coinDenom}`;
    } else if (value < tokenMutez) {
        return `${numeral(convertMutezToInt(value)).format(
            '0,0.[000000]',
        )} ${coinDenom}`;
    }

    return `${convertMutezToInt(value)} ${coinDenom}`;
};

export const formatDate = (date: string) => {
    if (!date) return '---';

    return moment(date).format('lll');
};

export const getNumberOfDays = (endDate: number): number => {
    if (!endDate) return 0;

    return moment(endDate).diff(moment(), 'days');
};
