import React from 'react';
import VerificationInput from 'react-verification-input';
import classNames from 'classnames';

import { AuthTestIds } from '@components/AuthContainer/constants/AuthTestIds';

import styles from './CustomVerificationInput.module.scss';

interface CustomVerificationInputProps {
    verificationCode: string;
    setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
    incorrectVerificationCode: boolean;
    onCompleteVerificataion: (code: string) => Promise<void>;
}

export const CustomVerificationInput = ({
    verificationCode,
    setVerificationCode,
    incorrectVerificationCode,
    onCompleteVerificataion,
}: CustomVerificationInputProps) => (
    <VerificationInput
        value={verificationCode}
        onChange={setVerificationCode}
        validChars='0-9'
        placeholder=''
        classNames={{
            container: styles['container'],
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
