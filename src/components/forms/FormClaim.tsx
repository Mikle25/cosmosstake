import React, { FC, useCallback, useState } from 'react';
import Loader from '../Loader';
import { Btn, WrapperBtn } from '../styled/Btn';
import { useTheme } from 'styled-components';
import { Text, Title } from '../styled/Text';
import { FlexCustom } from '../styled/Flex';
import Select from '../Select';
import { ValidatorRewardResp } from '../dashboard/types';
import { useKepler } from '../../store';
import useStargateSDK from '../../hooks/useStargateSDK';
import useGetExplorerTrx from '../../hooks/useGetExplorerTrx';
import Transaction from '../Transaction';
import { useWallet } from '../../store/wallet';
import AllDoneText from '../AllDoneText';
import Box from '../styled/Box';

interface FormClaimProps {
    data: Array<ValidatorRewardResp>;
    totalRewords: string;
}

const FormClaim: FC<FormClaimProps> = (props) => {
    const theme = useTheme();
    const { account } = useKepler();
    const { updateBalance } = useWallet();
    const { data, totalRewords } = props;
    const [currentItem, setCurrentItem] = useState<ValidatorRewardResp>(
        data[0],
    );
    const { Claim, isLoading } = useStargateSDK();
    const { trx, linkTrx, handleLink, statusCode } = useGetExplorerTrx();

    const chooseItem = (e: any) => {
        setCurrentItem(e);
    };

    const onClaim = useCallback(
        async (currItem) => {
            const resp = await Claim(account, currItem.address);
            updateBalance();
            if (resp) {
                handleLink(resp);
            }
        },
        [currentItem],
    );

    return (
        <FlexCustom direction="column" gap="35px">
            {statusCode ? (
                <AllDoneText color={theme.white} />
            ) : (
                <Title as="h3">Claim rewards</Title>
            )}

            <FlexCustom gap="15px" direction="column">
                <Text>SELECT VALIDATOR</Text>

                <Select
                    data={data}
                    currentItem={currentItem}
                    chooseItem={chooseItem}
                />

                {statusCode ? (
                    <Transaction
                        trx={trx}
                        linkTrx={linkTrx}
                        styles={{ color: theme.black, bgColor: theme.white }}
                    />
                ) : (
                    <Text color={theme.gray}>
                        TOTAL REWARD TOKENS: {totalRewords}
                    </Text>
                )}
            </FlexCustom>

            <WrapperBtn bgColor={statusCode ? theme.lightGreen : theme.white}>
                {isLoading ? (
                    <Loader color={theme.black} padding="16px 0" />
                ) : statusCode ? (
                    <Box padding="16px 0">
                        <Text color={theme.black}>
                            CLAIMED TOKENS SUCCESSFULLY
                        </Text>
                    </Box>
                ) : (
                    <Btn
                        variant={'active'}
                        onClick={() => onClaim(currentItem)}
                    >
                        CONFIRM ON KEPLR
                    </Btn>
                )}
            </WrapperBtn>
        </FlexCustom>
    );
};

export default FormClaim;
