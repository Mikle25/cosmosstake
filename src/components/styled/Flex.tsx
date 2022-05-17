import styled from 'styled-components';

type FlexProps = {
    gap: string;
    direction: 'column' | 'row';
    align: 'center' | 'start' | 'end';
};

const Flex = styled.div`
    display: flex;
`;

const FlexAlignCenter = styled(Flex)`
    align-items: center;
`;

const FlexJustifyCenter = styled(Flex)`
    justify-content: center;
`;

const FlexCenter = styled(Flex)`
    justify-content: center;
    align-items: center;
`;

const FlexJustifyBetween = styled(FlexAlignCenter)`
    justify-content: space-between;
`;

const FlexWithGap = styled(FlexAlignCenter)<Partial<FlexProps>>`
    gap: ${({ gap }) => gap ?? '0'};
`;

const FlexCustom = styled(Flex)<Partial<FlexProps>>`
    flex-direction: ${({ direction }) => direction ?? 'row'};
    align-items: ${({ align }) => align ?? 'stratch'};
    gap: ${({ gap }) => gap ?? '0'};
`;

export {
    Flex,
    FlexAlignCenter,
    FlexCenter,
    FlexJustifyCenter,
    FlexJustifyBetween,
    FlexWithGap,
    FlexCustom,
};
