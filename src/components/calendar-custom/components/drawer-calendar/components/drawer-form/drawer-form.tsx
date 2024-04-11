import { FC } from 'react';
import { CurrentTraining } from '@components/calendar-custom/types/current-training';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { setCurrentTraining } from '@redux/slice/training-slice';
import { Form } from 'antd';

import { ExercisesList } from '../exercises-list';

const INITIAL_STATE_DRAWER_FORM = {
    name: '',
    approaches: '',
    weight: '',
    replays: '',
};

export const DrawerForm: FC<{ onCloseDrawer: () => void }> = ({ onCloseDrawer }) => {
    const [form] = Form.useForm();

    const { currentTraining } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const onFinish = (values: { exercises: CurrentTraining[] }) => {
        const validExercisesName = values.exercises.filter((item) => item.name);

        const validExercises = validExercisesName.map((el) => ({
            ...el,
            approaches: el.approaches || 1,
            replays: el.replays || 1,
            weight: el.weight || 0,
        }));

        dispatch(setCurrentTraining(validExercises.length > 0 ? validExercises : null));
        onCloseDrawer();
    };

    return (
        <Form
            form={form}
            name='drawer-form'
            autoComplete='off'
            onFinish={onFinish}
            initialValues={
                currentTraining
                    ? { exercises: currentTraining }
                    : { exercises: [INITIAL_STATE_DRAWER_FORM] }
            }
            colon={false}
        >
            <ExercisesList />
        </Form>
    );
};
