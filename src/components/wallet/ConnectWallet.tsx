import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useKepler } from '../../store';
import { Text } from '../styled/Text';
import { useThemeToggle } from '../../hooks/useThemeContext';

const ConnectWalletWrap = styled.div`
    width: 100%;
    align-self: flex-end;
    text-align: end;
    padding-right: 50px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.main};
    padding-bottom: ${({ theme }) => theme.paddingBHeader};
    border-bottom: ${({ theme }) => theme.defaultBorderNav};
    font-size: ${({ theme }) => theme.fs14};
`;

const BtnConnectWallet = styled.button`
    padding: 0;
    outline: none;
    border: none;
    background-color: transparent;
    color: ${({ theme, color }) => color ?? theme.main};
    text-transform: uppercase;
`;

const LinkInstWallet = styled.a`
    color: ${({ theme }) => theme.main};

    &:hover {
        color: ${({ theme }) => theme.lightGreen};
    }
`;

const ConnectWallet = () => {
    const theme = useTheme();
    const { themeName } = useThemeToggle();
    const { signedIn, account, chain, setAccount } = useKepler();

    return (
        <>
            {signedIn ? (
                account ? (
                    <ConnectWalletWrap>
                        <Text
                            color={
                                themeName === 'dark'
                                    ? theme.lightGreen
                                    : theme.black
                            }
                        >
                            Keplr connected
                        </Text>
                    </ConnectWalletWrap>
                ) : (
                    <ConnectWalletWrap>
                        <BtnConnectWallet onClick={() => setAccount(chain)}>
                            Connect wallet
                        </BtnConnectWallet>
                    </ConnectWalletWrap>
                )
            ) : (
                <ConnectWalletWrap>
                    <LinkInstWallet
                        href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=ru"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Install Keplr wallet
                    </LinkInstWallet>
                </ConnectWalletWrap>
            )}
        </>
    );
};

export default ConnectWallet;
