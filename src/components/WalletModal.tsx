import React, { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Wallet2 } from 'react-bootstrap-icons';
import { ellipsis, formatMinimalDenomToCoinDenom } from '../utils/helpers';
import BtnCopy from './BtnCopy';
import { Flex, FlexAlignCenter } from './styled/Flex';
import { store } from '../store';
import useApi from '../hooks/useApi';

const WrapperAccount = styled(Flex)`
    flex-direction: column;
    gap: 20px;
    min-height: 75px;
`;

const WrapperBalance = styled(Flex)`
    flex-direction: column;
    gap: 5px;
`;

const WalletModal: FC = () => {
    const { chain, account, setBalance, balance } = useContext(store);
    const { API } = useApi(chain);

    useEffect(() => {
        if (account) {
            setBalance(account.address, API.getBalance);
        }
    }, [account]);

    return (
        <WrapperAccount>
            {account ? (
                <FlexAlignCenter>
                    <Wallet2
                        size="20px"
                        style={{
                            marginRight: '10px',
                            verticalAlign: 'baseline',
                        }}
                    />
                    {ellipsis(account.address)}
                    <BtnCopy textToCopy={account.address} />
                </FlexAlignCenter>
            ) : (
                <Flex>
                    <a
                        href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=ru"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h5>(Keplr wallet not installed)</h5>
                    </a>
                </Flex>
            )}

            <WrapperBalance>
                <span>Available Balance</span>

                <h5>
                    {formatMinimalDenomToCoinDenom(
                        balance?.amount,
                        chain?.coinDenom,
                    )}
                </h5>
            </WrapperBalance>
        </WrapperAccount>
    );
};

export default WalletModal;
