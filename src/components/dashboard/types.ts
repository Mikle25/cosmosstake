export interface RewardsResp {
    reward: Array<{
        denom: string;
        amount: string;
    }>;
    validator_address: string;
}

export interface ValidatorRewardResp {
    validatorName: string;
    address: string | string[];
    value: string;
}
