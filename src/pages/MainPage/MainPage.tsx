import { MainContent } from '@components/MainContent';
import { MainFooter } from '@components/MainFooter';
import { MainHeader } from '@components/MainHeader';
import { Loader } from '@components/ui/Loader';

import { isLoadingSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';

export const MainPage = () => {
    const isLoading = useAppSelector(isLoadingSelector);

    return (
        <>
            {isLoading && <Loader />}
            <MainHeader />
            <MainContent />
            <MainFooter />
        </>
    );
};
