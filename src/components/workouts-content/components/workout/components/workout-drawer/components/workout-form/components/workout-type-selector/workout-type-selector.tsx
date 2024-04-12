import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { catalogSelector } from '@redux/selectors';
import { setTypeTraining } from '@redux/slice/training-slice';
import { Form, Select } from 'antd';

import styles from './workout-type-selector.module.less';

type SelectOption = {
    label: string;
    value: string;
};

export const WorkoutTypeSelector = () => {
    const { catalogTrainingList } = useAppSelector(catalogSelector);
    const dispatch = useAppDispatch();

    const handleChange = (_: string, option: SelectOption | SelectOption[]) => {
        const currentOption = Array.isArray(option) ? option[0].label : option.label;

        dispatch(setTypeTraining(currentOption));
    };

    const newTrainingList = catalogTrainingList.map((obj) => ({
        label: obj.name,
        value: obj.key,
    }));

    return (
        <Form.Item name='typeTraining' className={styles['form-select']}>
            <Select
                autoFocus={true}
                options={newTrainingList}
                placeholder={<span>Выбор типа тренировки</span>}
                onChange={handleChange}
                className={styles.select}
                data-test-id='modal-create-exercise-select'
            />
        </Form.Item>
    );
};
