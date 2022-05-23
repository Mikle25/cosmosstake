import React, { FC } from 'react';

export interface IconProps {
    width?: string;
    height?: string;
    viewBox?: string;
    fill?: string;
}

const LayoutIcon: FC<IconProps> = ({
    children,
    fill = 'black',
    width = '25',
    viewBox = '0 0 25 26',
    height = '26',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
};

export default LayoutIcon;
