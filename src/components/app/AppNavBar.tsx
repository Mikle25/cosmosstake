import React from 'react';
import styled from 'styled-components';
import { useKepler } from '../../store';
import { CHAIN_LIST_MAINNET } from '../../utils/constants';
import { capitalizeLetters } from '../../utils/helpers';
import ThemeToggle from './ThemeToggle';
import { IChainList } from '../../interface/ChainList';

const WrapperList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 100px;
    height: 100vh;
    padding: 0 30px;
    overflow: scroll;
    border-radius: 5px;
    background: transparent;
    box-shadow: rgb(2 3 3 / 50%) 20px 20px 50px;
`;

const ChainList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
`;

const Li = styled.li<{ activeitem: boolean }>`
    display: grid;
    grid-template-columns: 20% 1fr 20%;
    align-items: center;
    width: 240px;
    height: 45px;
    cursor: pointer;

    font-size: ${({ theme }) => theme.fs18};
    color: ${({ theme, activeitem }) =>
        activeitem ? theme.black : theme.main};
    text-decoration: none;
    background: ${({ theme, activeitem }) =>
        activeitem ? theme.white : 'transparent'};
    transition: ${({ theme }) => theme.transitionCustom('all')};

    & svg,
    span {
        justify-self: center;
        fill: ${({ theme, activeitem }) =>
            activeitem ? theme.black : theme.main};
        transition: ${({ theme }) => theme.transitionCustom('all')};
    }

    &:hover svg {
        fill: ${({ theme }) => theme.black};
    }

    & div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        vertical-align: middle;
        background: ${({ theme, activeitem }) =>
            activeitem ? theme.lightGreen : 'transparent'};
        transition: ${({ theme }) => theme.transitionCustom('all')};
    }

    &:hover div {
        background: ${({ theme }) => theme.lightGreen};
    }

    &:hover {
        color: ${({ theme }) => theme.black};
        background: ${({ theme }) => theme.white};
    }
`;

const AppNavBar = () => {
    const { setAccount, chain } = useKepler();

    const handleSetAccount = (chooseChain: IChainList) => {
        setAccount(chooseChain);
    };

    return (
        <WrapperList>
            <ChainList>
                {CHAIN_LIST_MAINNET.map((blockchain, i) => (
                    <Li
                        key={i}
                        onClick={() => handleSetAccount(blockchain)}
                        activeitem={chain?.name === blockchain.name}
                    >
                        <span>
                            <blockchain.icon />
                        </span>

                        {capitalizeLetters(blockchain.name)}

                        <div>10%</div>
                    </Li>
                ))}
            </ChainList>

            <ThemeToggle />
        </WrapperList>
    );
};

export default AppNavBar;
