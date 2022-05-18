import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ChevronDown } from 'react-bootstrap-icons';
import { ValidatorRewardResp } from './dashboard/types';

interface SelectProps {
    data: Array<ValidatorRewardResp>;
    currentItem: ValidatorRewardResp;
    chooseItem: (e: any) => void;
}

const DropDownContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.gray100};
    font-size: ${({ theme }) => theme.fs18};
`;

const DropDownHeader = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding-left: 18px;

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;

        & div {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & div:first-child {
            height: 100%;
        }
        & div:last-child {
            align-self: center;
            width: fit-content;
            min-width: 25%;
            height: 100%;
            padding: 0 10px;
            background-color: ${({ theme }) => theme.lightGreen};
        }
    }
`;

const DropDownListContainer = styled.ul<{ isOpen: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: fit-content;
    max-height: 150px;
    overflow: scroll;

    list-style: none;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.black};
`;

const ListItem = styled.li`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;

    &:hover {
        background-color: ${({ theme }) => theme.lightGreen};
    }
`;

const Select: FC<SelectProps> = (props) => {
    const { data, currentItem, chooseItem } = props;
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const select: any = useRef(null);

    const toggling = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const onClick = (e: any) =>
            select.current.contains(e.target) || setIsOpen(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <DropDownContainer onClick={toggling} ref={select}>
            <DropDownHeader>
                <ChevronDown fill={theme.gray100} />
                <div>
                    <div>{currentItem?.validatorName}</div>
                    <div>
                        <span>{currentItem?.value}</span>
                    </div>
                </div>
            </DropDownHeader>

            <DropDownListContainer isOpen={isOpen}>
                {data.map((elem: any, i: number) => (
                    <ListItem key={i} onClick={() => chooseItem(elem)}>
                        <span>{elem?.validatorName}</span>{' '}
                        <span>{elem?.value}</span>
                    </ListItem>
                ))}
            </DropDownListContainer>
        </DropDownContainer>
    );
};

export default Select;
