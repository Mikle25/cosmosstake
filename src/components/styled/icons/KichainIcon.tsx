import React, { FC } from 'react';
import LayoutIcon, { IconProps } from './LayoutIcon';

const KichainIcon: FC<IconProps> = (props) => {
    return (
        <LayoutIcon width="15" height="21" viewBox="0 0 15 21" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.14516 16.7097C3.3299 16.7097 4.29032 17.6701 4.29032 18.8548C4.29032 20.0396 3.3299 21 2.14516 21C0.960422 21 0 20.0396 0 18.8548C0 17.6701 0.960422 16.7097 2.14516 16.7097ZM4.24301 0V6.57645L9.38929 0H13.948L8.73967 7.30249L14.828 15.2537H9.65142L4.24301 8.14922V15.2537H0V0H4.24301Z"
            />
        </LayoutIcon>
    );
};

export default KichainIcon;
