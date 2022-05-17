import React, { FC } from 'react';
import LayoutIcon, { IconProps } from './LayoutIcon';

const ArrowIcon: FC<IconProps> = (props) => {
    return (
        <LayoutIcon width="13" height="13" viewBox="0 0 13 13" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.30662 0.146484L0.286621 4.16649V4.87359L4.30662 8.89359L5.01373 8.18649L1.80722 4.97998H3.69029C6.50345 4.97998 8.29521 5.58487 9.39555 6.70855C10.4977 7.83407 11.0103 9.5857 11.0103 12.13V12.48H12.0103V12.13C12.0103 9.48426 11.4829 7.4109 10.11 6.00891C8.73538 4.60509 6.61713 3.97998 3.69029 3.97998H1.88734L5.01373 0.853591L4.30662 0.146484Z"
            />
        </LayoutIcon>
    );
};

export default ArrowIcon;
