import React, { FC } from 'react';
import VerificationInput from 'react-verification-input';
import { AuthTestIds } from '@components/auth-container/constants/auth-test-ids';
import classNames from 'classnames';

import styles from './custom-verification-input.module.less';

type CustomVerificationInputProps = {
    verificationCode: string;
    setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
    incorrectVerificationCode: boolean;
    onCompleteVerificataion: (code: string) => Promise<void>;
};

export const CustomVerificationInput: FC<CustomVerificationInputProps> = ({
    verificationCode,
    setVerificationCode,
    incorrectVerificationCode,
    onCompleteVerificataion,
}) => (
    <VerificationInput
        value={verificationCode}
        onChange={setVerificationCode}
        validChars='0-9'
        placeholder=''
        classNames={{
            container: styles.container,
            character: classNames(
                styles.character,
                incorrectVerificationCode ? styles['character-error'] : null,
            ),
            characterInactive: styles['character--inactive'],
            characterSelected: styles['character--selected'],
            characterFilled: styles['character--filled'],
        }}
        onComplete={onCompleteVerificataion}
        inputProps={{ 'data-test-id': AuthTestIds.VERIFICATION_INPUT }}
    />
);
