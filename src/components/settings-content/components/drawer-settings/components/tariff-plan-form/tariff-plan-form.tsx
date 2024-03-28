import { FC } from 'react';
import { useAppSelector } from '@hooks/redux-hooks';
import { useAddNewTariffMutation } from '@redux/api/tariff.api';
import { catalogSelector } from '@redux/selectors';
import { Form, Radio, Typography } from 'antd';

import { TarifPlanItem } from './components/tarif-plan-item';
import styles from './tariff-plan-form.module.less';

type TariffPlanFormProps = {
    onClose: () => void;
    setModalCheck: React.Dispatch<React.SetStateAction<boolean>>;
    setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TariffPlanForm: FC<TariffPlanFormProps> = ({
    onClose,
    setModalCheck,
    setButtonDisabled,
}) => {
    const [form] = Form.useForm();

    const [addNewTariff] = useAddNewTariffMutation();

    const { catalogTariffList } = useAppSelector(catalogSelector);

    const onFinish = (values: { days: number }) => {
        const { days } = values;

        if (catalogTariffList) {
            const { _id: id } = catalogTariffList[0];

            addNewTariff({
                tariffId: id,
                days,
            });

            setModalCheck(true);
        }

        onClose();
    };

    const onFieldsChange = () => setButtonDisabled(false);

    return (
        <Form
            form={form}
            name='drawer-form-tariff'
            scrollToFirstError={true}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            data-test-id='tariff-cost'
        >
            <Typography.Paragraph className={styles['tariff-cost-title']}>
                Стоимость тарифа
            </Typography.Paragraph>
            <Form.Item name='days'>
                <Radio.Group className={styles['radio-group']}>
                    {catalogTariffList && catalogTariffList[0]?.periods && (
                        <TarifPlanItem catalogTariffPeriods={catalogTariffList[0]?.periods} />
                    )}
                </Radio.Group>
            </Form.Item>
        </Form>
    );
};
