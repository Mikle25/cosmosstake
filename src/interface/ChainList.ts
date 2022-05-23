import React, { FC } from 'react';
import { IconProps } from '../components/styled/icons/LayoutIcon';

export interface IChainList {
    name: string;
    chainId: string;
    coinMinimalDenom: string;
    coinDenom: string;
    icon: FC<IconProps>;
    rest: string;
    rpc: string;
    explorer: string;
    yield?: number;
}
