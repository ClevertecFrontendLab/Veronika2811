import React, { useEffect, useState } from 'react';
import { PROFILE_TEST_IDS } from '@components/profile-form/constants/profile-test-ids';
import { ModalNotification } from '@components/ui/modal-notification';
import { useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { ApiEndpoints } from '@redux/api/constants/api-endpoints';
import { BASE_URL } from '@redux/api/constants/base-url';
import { authSelector, profileSelector } from '@redux/selectors';
import { isArrayWithItems } from '@utils/is-array-with-items';
import { Form, Upload, UploadFile, UploadProps } from 'antd';
import { UploadFileStatus } from 'antd/lib/upload/interface';

import { UploadButton } from './components/upload-button';

export const FormUpload = () => {
    const { isXs } = useBreakpoints();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isFileTooLarge, setIsFileTooLarge] = useState(false);

    const { accessToken } = useAppSelector(authSelector);
    const { currentUserInfo } = useAppSelector(profileSelector);

    const isShowPreview = isArrayWithItems(fileList);

    useEffect(() => {
        if (currentUserInfo.imgSrc && typeof currentUserInfo.imgSrc === 'string') {
            setFileList([
                {
                    uid: '1',
                    name: 'image.jpg',
                    url: currentUserInfo.imgSrc,
                },
            ]);
        }
    }, [currentUserInfo]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        const newFile = newFileList[0];

        if (newFile) {
            if (newFile.status === 'error') {
                const errorFileList = {
                    uid: '1',
                    name: newFile.name,
                    url: '',
                    status: 'error' as UploadFileStatus,
                };

                setFileList([errorFileList]);
            }

            if (newFile.error?.status === 409) {
                setIsFileTooLarge(true);
            }
        }
    };

    const closeModalError = () => setIsFileTooLarge(false);

    return (
        <React.Fragment>
            <Form.Item name='imgSrc' data-test-id={PROFILE_TEST_IDS.profileAvatar}>
                <Upload
                    maxCount={1}
                    accept='image/*'
                    action={`${BASE_URL}${ApiEndpoints.UPLOAD_IMAGE}`}
                    headers={{ authorization: `Bearer ${accessToken}` }}
                    onChange={handleChange}
                    fileList={fileList}
                    listType={isXs ? 'picture' : 'picture-card'}
                    progress={{ strokeWidth: 4, showInfo: false }}
                >
                    {!isShowPreview && <UploadButton isXs={isXs} />}
                </Upload>
            </Form.Item>
            <ModalNotification
                type='error-big-file'
                open={isFileTooLarge}
                onClickButton={closeModalError}
            />
        </React.Fragment>
    );
};
