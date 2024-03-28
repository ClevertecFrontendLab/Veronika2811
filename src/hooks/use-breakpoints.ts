import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export const useBreakpoints = () => {
    const breakpoints = useBreakpoint();

    const isXs = breakpoints.xs; // < 576px
    const isSm = breakpoints.sm; // ≥ 576px
    const isMd = breakpoints.md; // ≥ 768px
    const isLg = breakpoints.lg; // ≥ 992px
    const isXl = breakpoints.xl; // ≥ 1200px
    const isXxl = breakpoints.xxl; // ≥ 1600px

    return {
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        isXxl,
    };
};
