import { useState } from 'react';

export type TFunc = {
    (opt?: any): any;
};

type RequestProps = {
    request: (func: TFunc, opt?: any) => Promise<void>;
    isLoading: boolean;
    resp: any;
};

const useRequest = (): RequestProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resp, setResp] = useState<any>({});

    const request = async (func: TFunc, opt?: any) => {
        try {
            setIsLoading(true);
            const data = await func(opt);

            setResp(data.data);
        } catch (e: any) {
            console.error(e);
            setResp({});
        } finally {
            setIsLoading(false);
        }
    };

    return {
        request,
        isLoading,
        resp,
    };
};

export default useRequest;
