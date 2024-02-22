import { RootState } from '@redux/store';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import { Header } from '@components/Header';
import { MainContent } from '@components/MainContent';
import { MainFooter } from '@components/Footer';
import { Loader } from '@components/ui/Loader';

export const MainPage = () => {
    const isLoading = useAppSelector((state: RootState) => state.userInfoSlice.isLoading);

    return (
        <>
            {isLoading && <Loader />}
            <Header />
            <MainContent />
            <MainFooter />
        </>
    );
};
