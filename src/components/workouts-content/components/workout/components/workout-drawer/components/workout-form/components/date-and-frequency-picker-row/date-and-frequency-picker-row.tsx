import { useState } from 'react';
import { filterTrainingsByDate } from '@components/calendar-custom/utils/filter-trainings-by-date';
import { isPastDate } from '@components/calendar-custom/utils/is-past-date';
import { PICKER_LOCALE } from '@constants/picker-locale';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Checkbox, Col, DatePicker, Form, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Moment } from 'moment';

import { TrainingFrequencySelect } from '../training-frequency-select';

import styles from './date-and-frequency-picker-row.module.less';

export const DateAndFrequencyPickerRow = () => {
    const { userTrainingList, editTrainingData } = useAppSelector(trainingSelector);

    const [repeatWorkout, setRepeatWorkout] = useState(
        editTrainingData ? !!editTrainingData.parameters.period : false,
    );

    const onChangeCheckbox = (e: CheckboxChangeEvent) => setRepeatWorkout(e.target.checked);

    const getDisabledDate = (pickerDate: Moment) => isPastDate(pickerDate);

    const dateCellRender = (pickerDate: Moment) => {
        const trainingList = filterTrainingsByDate(userTrainingList, pickerDate);

        const isUserTraningInSelectedDay = trainingList.length > 0;

        if (isUserTraningInSelectedDay) {
            return <div className={styles['selected-date']}>{pickerDate.date()}</div>;
        }

        return pickerDate.date();
    };

    return (
        <Row gutter={16}>
            <Col span={12} className='date-col'>
                <Form.Item name='date' className='form-item-date'>
                    <DatePicker
                        locale={PICKER_LOCALE}
                        data-test-id='modal-drawer-right-date-picker'
                        disabledDate={getDisabledDate}
                        dateRender={dateCellRender}
                    />
                </Form.Item>
            </Col>
            <Col span={12} className='checkbox-col'>
                <Form.Item name='withFrequency' valuePropName='checked' noStyle={true}>
                    <Checkbox
                        onChange={onChangeCheckbox}
                        data-test-id='modal-drawer-right-checkbox-period'
                    >
                        С периодичностью
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={12}>{repeatWorkout && <TrainingFrequencySelect />}</Col>
        </Row>
    );
};
