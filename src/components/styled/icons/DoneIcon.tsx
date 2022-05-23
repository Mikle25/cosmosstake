import React, { FC } from 'react';
import LayoutIcon, { IconProps } from './LayoutIcon';

const DoneIcon: FC<IconProps> = (props) => {
    return (
        <LayoutIcon width="26" height="26" viewBox="0 0 26 26" {...props}>
            <path d="M10.9231 18.098L5.90909 13.084L7.58043 11.4126L10.9231 14.7553L17.6085 8.06993L19.2798 9.74127L10.9231 18.098Z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13ZM13 23.6364C7.1257 23.6364 2.36364 18.8743 2.36364 13C2.36364 7.1257 7.1257 2.36364 13 2.36364C18.8743 2.36364 23.6364 7.1257 23.6364 13C23.6364 18.8743 18.8743 23.6364 13 23.6364Z"
            />
        </LayoutIcon>
    );
};

export default DoneIcon;
