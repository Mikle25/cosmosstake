export interface IDelegatedProps {
    delegation: {
        delegator_address: string;
        validator_address: string;
        shares: string;
    };
    balance: {
        denom: string;
        amount: string;
    };
}
