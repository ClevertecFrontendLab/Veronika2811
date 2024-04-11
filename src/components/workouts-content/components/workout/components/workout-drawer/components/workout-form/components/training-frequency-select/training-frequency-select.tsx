import { PERIOD_OPTION } from '@components/workouts-content/constants/period-option';
import { Form, Select } from 'antd';

export const TrainingFrequencySelect = () => (
    <Form.Item name='frequency' className='form-item-period'>
        <Select
            autoFocus={true}
            options={PERIOD_OPTION}
            placeholder='Периодичность'
            data-test-id='modal-drawer-right-select-period'
            size='middle'
        />
    </Form.Item>
);
