import React from 'react';
import styled from 'styled-components';
import { FlexWithGap } from '../styled/Flex';
import Logo from './Logo';

const CustomBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
    padding: 0 63px;
    color: ${({ theme }) => theme.main};
    position: sticky;
    top: 100%;

    & > span {
        color: ${({ theme }) => theme.gray};
    }
`;

const listProjectEverstake = [
    {
        name: 'STAKESOLANA',
        link: '',
    },
    {
        name: 'EVERLAND',
        link: '',
    },
    {
        name: 'COSMOSCAN',
        link: '',
    },
    {
        name: 'METAPLEX',
        link: '',
    },
    {
        name: 'WORMHOLE',
        link: '',
    },
];

const AppFooter = () => {
    return (
        <CustomBox color="transparent">
            <Logo margin="0" height="30px" />
            <span>
                Cosmostake is created for simplify staking on Cosmos chaine.
                Powered by <span>Everstake</span>, the co-developers of
            </span>

            <FlexWithGap gap="20px">
                {listProjectEverstake.map((elem, i) => (
                    <a key={i} href={elem.link}>
                        {elem.name}
                    </a>
                ))}
            </FlexWithGap>
        </CustomBox>
    );
};

export default AppFooter;
