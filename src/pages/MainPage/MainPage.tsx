import { Header } from '@components/Header';
import { MainContent } from '@components/MainContent';
import { MainFooter } from '@components/Footer';
import { Loader } from '@components/ui/Loader';

import { isLoadingSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const MainPage = () => {
    const isLoading = useAppSelector(isLoadingSelector);

    return (
        <>
            {isLoading && <Loader />}
            <Header />
            <MainContent />
            <MainFooter />
        </>
    );
};
