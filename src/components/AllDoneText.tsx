import React from 'react';
import { FlexCustom } from './styled/Flex';
import DoneIcon from './styled/icons/DoneIcon';
import { Title } from './styled/Text';

interface AllDoneTextProps {
    color: string;
}

const AllDoneText = (props: AllDoneTextProps) => {
    const { color } = props;
    return (
        <FlexCustom gap="10px" align="center">
            <DoneIcon fill={color} width="20" height="20" />
            <Title as="h3" color={color}>
                All Done
            </Title>
        </FlexCustom>
    );
};

export default AllDoneText;
