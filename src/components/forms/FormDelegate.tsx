import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { useKepler } from '../../store';
import { Btn, WrapperBtn } from '../styled/Btn';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useWallet } from '../../store/wallet';
import Form, { FormBtn, FormControl } from '../styled/Form';
import { FlexCustom, FlexJustifyBetween, FlexWithGap } from '../styled/Flex';
import {
    convertIntToMutez,
    ellipsis,
    formatPercent,
} from '../../utils/helpers';
import { Text, Title } from '../styled/Text';
import useStargateSDK from '../../hooks/useStargateSDK';
import Loader from '../Loader';
import useGetExplorerTrx from '../../hooks/useGetExplorerTrx';
import Transaction from '../Transaction';
import { useTheme } from 'styled-components';
import AllDoneText from '../AllDoneText';
import Box from '../styled/Box';

interface IFormProps {
    handleClose(): void;
    data: any;
    currValue?: string;
}

const schema = yup.object().shape({
    amount: yup
        .number()
        .required('Required')
        // .min(0.1, 'Minimum value is 0.1')
        .test('amount', 'Max value is your balance', (val: any, props: any) => {
            return val <= props.parent.balance;
        })
        .test(
            'amount',
            'Min value 0.01',

            (val: any) => val >= 0.01,
        ),
});

const FormDelegate = ({ handleClose, data, currValue }: IFormProps) => {
    const theme = useTheme();
    const { chain, account } = useKepler();
    const { balance, updateBalance } = useWallet();
    const { Delegate, isLoading } = useStargateSDK();
    const { handleLink, trx, linkTrx, statusCode } = useGetExplorerTrx();
    const { description, commission, operator_address: validator } = data;

    const handleSubmit = async (amount: number | string) => {
        const respDeleg = await Delegate({
            from: account,
            to: validator,
            amount: convertIntToMutez(amount),
            denom: chain.coinMinimalDenom,
        });

        if (respDeleg) {
            handleLink(respDeleg);
        }

        updateBalance();
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                amount: currValue ?? '',
                balance: balance,
            }}
            onSubmit={(values) => {
                handleSubmit(values.amount);
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                setFieldValue,
            }) => (
                <FlexCustom direction="column" gap="35px">
                    {statusCode ? (
                        <AllDoneText color={theme.black} />
                    ) : (
                        <Title as="h3" color={theme.black}>
                            Stake
                        </Title>
                    )}

                    <Form noValidate onSubmit={handleSubmit}>
                        <FlexCustom direction="column" gap="20px">
                            <Form.Label>
                                ENTER THE QUANTITY OF TOKENS TO STAKE
                            </Form.Label>

                            <InputGroup>
                                <Field
                                    as={FormControl}
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={values.amount}
                                    onChange={handleChange}
                                    isInvalid={!!errors.amount}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                            </InputGroup>

                            {statusCode ? (
                                <Transaction trx={trx} linkTrx={linkTrx} />
                            ) : (
                                <Form.Group as={FlexJustifyBetween}>
                                    <Form.Label>
                                        <span>
                                            Available balance:{' '}
                                            {`${balance} ${chain.coinDenom}`}
                                        </span>
                                    </Form.Label>

                                    <FlexWithGap gap="10px">
                                        <Field
                                            as={FormBtn}
                                            id="button-addon3"
                                            variant="default"
                                            onClick={() =>
                                                setFieldValue(
                                                    'amount',
                                                    `${Number(balance) / 2}`,
                                                )
                                            }
                                        >
                                            50%
                                        </Field>

                                        <Field
                                            as={FormBtn}
                                            variant="default"
                                            id="button-addon2"
                                            onClick={() =>
                                                setFieldValue('amount', balance)
                                            }
                                        >
                                            max
                                        </Field>
                                    </FlexWithGap>
                                </Form.Group>
                            )}

                            <FlexJustifyBetween>
                                <Text color="black">{description.moniker}</Text>

                                <FlexWithGap gap="10px">
                                    <span>
                                        {formatPercent(
                                            commission.commission_rates.rate,
                                        )}
                                    </span>

                                    <Text color="black">commission</Text>
                                </FlexWithGap>
                            </FlexJustifyBetween>
                        </FlexCustom>

                        <WrapperBtn
                            bgColor={
                                statusCode ? theme.lightGreen : theme.gray100
                            }
                        >
                            {isLoading ? (
                                <Loader padding="16px 0" />
                            ) : statusCode ? (
                                <Box padding="16px 0">
                                    <Text color={theme.black}>
                                        Staked successfully
                                    </Text>
                                </Box>
                            ) : (
                                <Btn
                                    variant={'active'}
                                    type="submit"
                                    disabled={!!errors.amount || !values.amount}
                                >
                                    Stake
                                </Btn>
                            )}
                        </WrapperBtn>
                    </Form>
                </FlexCustom>
            )}
        </Formik>
    );
};

export default FormDelegate;
