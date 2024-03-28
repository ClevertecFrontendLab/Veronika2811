import { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PROFILE_SETTINGS_OPTIONS } from '@components/settings-content/constants/profile-settings-options';
import { useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { useUpdateCurrentUserInfoMutation } from '@redux/api/profile.api';
import { profileSelector } from '@redux/selectors';
import { Form, Switch, Tooltip, Typography } from 'antd';
import classNames from 'classnames';

import styles from './profile-settings-form.module.less';

import { FieldData } from '@/types/field-data';

export const ProfileSettingsForm = () => {
    const [form] = Form.useForm();
    const { isXs } = useBreakpoints();

    const [updateUserInfo] = useUpdateCurrentUserInfoMutation();

    const { currentUserInfo } = useAppSelector(profileSelector);

    useEffect(() => {
        form.setFieldsValue(currentUserInfo);
    }, [currentUserInfo, form]);

    const onFieldsChange = (changedFields: FieldData[]) => {
        if (Array.isArray(changedFields[0].name)) {
            const fieldName = changedFields[0].name[0];
            const currentValue = changedFields[0].value;

            updateUserInfo({
                [fieldName]: currentValue,
            });
        }
    };

    return (
        <Form
            form={form}
            name='form-settings'
            scrollToFirstError={true}
            className={styles['form-settings']}
            onFieldsChange={onFieldsChange}
        >
            {PROFILE_SETTINGS_OPTIONS.map((item) => {
                const { title, tooltip, testIdsIcon, field, testIds } = item;

                const isDarkThemeAvailability =
                    item.title === 'Тёмная тема' && !currentUserInfo.tariff;

                return (
                    <div key={testIds} className={styles['form-settings-content']}>
                        <div className={styles.content}>
                            <Typography.Paragraph
                                className={classNames(styles.title, {
                                    [styles['title-inactive']]: isDarkThemeAvailability,
                                })}
                            >
                                {title}
                            </Typography.Paragraph>
                            <Tooltip
                                title={tooltip}
                                placement={isXs ? 'topLeft' : 'bottomLeft'}
                                color='#000000'
                            >
                                <InfoCircleOutlined
                                    data-test-id={testIdsIcon}
                                    className={styles['info-icon']}
                                />
                            </Tooltip>
                        </div>
                        <Form.Item name={field} key={title} valuePropName='checked'>
                            <Switch
                                disabled={isDarkThemeAvailability}
                                size={isXs ? 'small' : 'default'}
                                data-test-id={testIds}
                            />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    );
};
