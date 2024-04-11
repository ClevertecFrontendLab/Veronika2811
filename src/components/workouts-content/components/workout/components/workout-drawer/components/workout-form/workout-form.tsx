import React, { FC, useLayoutEffect } from 'react';
import { ExercisesList } from '@components/calendar-custom/components/drawer-calendar/components/exercises-list';
import { CurrentTraining } from '@components/calendar-custom/types/current-training';
import { isPastDate } from '@components/workouts-content/utils/is-past-date';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { usePostInviteMutation } from '@redux/api/invite.api';
import {
    useAddUserTrainingMutation,
    useEditUserTrainingMutation,
    useLazyGetUserTrainingDataQuery,
} from '@redux/api/training.api';
import { catalogSelector, trainingSelector, workoutsSelector } from '@redux/selectors';
import { setAlertApp } from '@redux/slice/main-slice';
import { resetEditMode } from '@redux/slice/training-slice';
import { checkIsPastTraining } from '@utils/check-is-past-training';
import { Form, FormInstance } from 'antd';
import moment, { Moment } from 'moment';

import { DateAndFrequencyPickerRow } from './components/date-and-frequency-picker-row';
import { SelectedUserInfo } from './components/selected-user-info';
import { WorkoutTypeSelector } from './components/workout-type-selector';
import styles from './workout-form.module.less';

import { FieldData } from '@/types/field-data';
import { Nullebel } from '@/types/nullebel';
import { TrainingResponse } from '@/types/training';

const INITIAL_STATE_EXERCISES = {
    name: '',
    approaches: '',
    weight: '',
    replays: '',
};

const INITIAL_STATE_WORKOUT_FORM = {
    typeTraining: undefined,
    date: undefined,
    withFrequency: false,
    frequency: undefined,
    exercises: [INITIAL_STATE_EXERCISES],
};

type FinishValues = {
    typeTraining: string;
    date: Moment | string;
    withFrequency: boolean;
    frequency: number;
    exercises: Nullebel<CurrentTraining[]>;
};

type WorkoutFormProps = {
    form: FormInstance;
    onCloseDrawer: () => void;
    setSaveTrainingError: React.Dispatch<React.SetStateAction<boolean>>;
    setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkoutForm: FC<WorkoutFormProps> = ({
    form,
    onCloseDrawer,
    setSaveTrainingError,
    setDisabledButton,
}) => {
    const [getUserTrainingList] = useLazyGetUserTrainingDataQuery();
    const [addUserTraining] = useAddUserTrainingMutation();
    const [editUserTraining] = useEditUserTrainingMutation();
    const [createInvite] = usePostInviteMutation();

    const { editTrainingData, editTraining } = useAppSelector(trainingSelector);
    const { selectedUser } = useAppSelector(workoutsSelector);
    const { catalogTrainingList } = useAppSelector(catalogSelector);
    const dispatch = useAppDispatch();

    const resetStateAndRefetch = async (operation: () => Promise<TrainingResponse>) => {
        try {
            const data = await operation();

            getUserTrainingList();
            dispatch(
                setAlertApp({
                    message: editTraining
                        ? 'Тренировка успешно обновлена'
                        : 'Новая тренировка успешно добавлена',
                    type: 'success',
                    testIds: 'create-training-success-alert',
                }),
            );
            if (selectedUser) {
                const { _id: id } = data;
                const trainingId: string = id || '';

                createInvite({ to: selectedUser.id, trainingId });
            }
            dispatch(resetEditMode());
            setSaveTrainingError(false);
        } catch (err) {
            setSaveTrainingError(true);
        } finally {
            onCloseDrawer();
        }
    };

    const onFinish = async (values: FinishValues) => {
        const trainingName = catalogTrainingList.find((el) => el.key === values.typeTraining);

        const validExercises = values?.exercises?.map((el) => ({
            ...el,
            approaches: el.approaches || 1,
            replays: el.replays || 1,
            weight: el.weight || 0,
        }));

        const body = {
            name: trainingName?.name || selectedUser?.trainingType,
            date: values.date,
            isImplementation: isPastDate(values.date),
            parameters: {
                repeat: values.withFrequency,
                period: values.frequency,
                jointTraining: !!selectedUser,
                participants: [],
            },
            exercises: validExercises || [],
        };

        if (editTraining) {
            const isPastTraining = checkIsPastTraining(editTraining?.type);

            await resetStateAndRefetch(() =>
                editUserTraining({
                    trainingId: editTraining.id,
                    body: {
                        ...body,
                        ...(isPastTraining ? { isImplementation: true } : {}),
                    },
                }).unwrap(),
            );
        } else {
            await resetStateAndRefetch(() => addUserTraining(body).unwrap());
        }
    };

    const checkArray = (allFields: FieldData[], field: string | number) =>
        allFields.find((el) => {
            if (Array.isArray(el.name)) {
                return el.name[0] === field;
            }

            return el.name === field;
        });

    const onFieldsChange = (_: FieldData[], allFields: FieldData[]) => {
        const typeTrainingForm = checkArray(allFields, 'typeTraining');
        const dateTraining = checkArray(allFields, 'date');
        const nameTraining = allFields.filter((el) => {
            if (Array.isArray(el.name)) {
                if (el.name[0] === 'exercises' && el.name[2] === 'name') return el;
            }

            return null;
        });

        if (
            selectedUser ||
            (typeTrainingForm?.value && dateTraining?.value && nameTraining.every((el) => el.value))
        ) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    };

    useLayoutEffect(() => {
        if (editTrainingData) {
            form.setFieldsValue({
                name: editTrainingData.name,
                date: moment(editTrainingData.date),
                frequency: editTrainingData.parameters.period,
                withFrequency: !!editTrainingData.parameters.period,
                exercises: editTrainingData.exercises,
            });
        }
    }, [editTrainingData, form]);

    return (
        <Form
            form={form}
            name='drawer-form-workout'
            autoComplete='off'
            onFinish={onFinish}
            initialValues={INITIAL_STATE_WORKOUT_FORM}
            onFieldsChange={onFieldsChange}
            colon={false}
            className={styles['drawer-workout']}
        >
            {!selectedUser && <WorkoutTypeSelector />}
            {selectedUser && (
                <SelectedUserInfo
                    imageSrc={selectedUser.imageSrc}
                    name={selectedUser.name}
                    trainingType={selectedUser.trainingType}
                />
            )}
            <DateAndFrequencyPickerRow />
            <ExercisesList workout={true} />
        </Form>
    );
};
