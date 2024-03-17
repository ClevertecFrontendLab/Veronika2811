import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Form, Input, InputNumber, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';
import { CurrentTraining } from '@components/CalendarCustom/types/currentTraining';

import { currentTrainingSelector, editTrainingSelector } from '@redux/selectors';
import { setCurrentTraining } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useBreakpoints } from '@hooks/useBreakpoints';

import styles from './DrawerForm.module.less';

const INITIAL_STATE_DRAWER_FORM = {
    name: '',
    approaches: '',
    weight: '',
    replays: '',
};

type RemoveListAntd = (index: number[] | number) => void;

export const DrawerForm = ({ onCloseDrawer }: { onCloseDrawer: () => void }) => {
    const [form] = Form.useForm();

    const { isXs } = useBreakpoints();

    const currentTraining = useAppSelector(currentTrainingSelector);
    const editTraining = useAppSelector(editTrainingSelector);
    const dispatch = useAppDispatch();

    const [removeFieldsKey, setRemoveFieldsKey] = useState<number[]>([]);

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

    const buttonStyles = classNames({
        [styles['drawer-buttons']]: editTraining,
        [styles['drawer-button-only']]: !editTraining,
    });

    const updateRemoveFieldsKey = useCallback(
        (e: CheckboxChangeEvent, index: number) => {
            if (e.target.checked) {
                return setRemoveFieldsKey((prev) => [...prev, index]);
            }

            setRemoveFieldsKey((prev) => prev.filter((prevIndex) => prevIndex !== index));
        },
        [setRemoveFieldsKey],
    );

    const removeFieldsForm = (remove: RemoveListAntd) => {
        remove(removeFieldsKey);
        setRemoveFieldsKey([]);
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
            <Form.List name='exercises'>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                direction='vertical'
                                key={key}
                                className={styles['exercise-item']}
                                size={!isXs ? 8 : 2}
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    className='exercise-name'
                                >
                                    <Input
                                        data-test-id={`${TrainingTestIds.MODAL_DRAWER_INPUT_EXERCISE}${name}`}
                                        placeholder='Упражнение'
                                        size='small'
                                        maxLength={32}
                                        addonAfter={
                                            editTraining ? (
                                                <Checkbox
                                                    onChange={(e: CheckboxChangeEvent) =>
                                                        updateRemoveFieldsKey(e, name)
                                                    }
                                                    data-test-id={`${TrainingTestIds.MODAL_DRAWER_CHECKBOX_EXERCISE}${name}`}
                                                />
                                            ) : (
                                                false
                                            )
                                        }
                                    />
                                </Form.Item>
                                <Form.Item className='exercise-inputs'>
                                    <Form.Item
                                        className={styles.approaches}
                                        {...restField}
                                        name={[name, 'approaches']}
                                        label='Подходы'
                                    >
                                        <InputNumber
                                            addonBefore='+'
                                            size='small'
                                            min={1}
                                            placeholder='1'
                                            data-test-id={`${TrainingTestIds.MODAL_DRAWER_INPUT_APPROACH}${name}`}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        className={styles.weight}
                                        {...restField}
                                        name={[name, 'weight']}
                                        label='Вес, кг'
                                    >
                                        <InputNumber
                                            size='small'
                                            min={0}
                                            placeholder='0'
                                            data-test-id={`${TrainingTestIds.MODAL_DRAWER_INPUT_WEIGHT}${name}`}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        className={styles.replays}
                                        {...restField}
                                        name={[name, 'replays']}
                                        label='Количество'
                                    >
                                        <InputNumber
                                            size='small'
                                            min={1}
                                            placeholder='3'
                                            data-test-id={`${TrainingTestIds.MODAL_DRAWER_INPUT_QUANTITY}${name}`}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </Space>
                        ))}
                        <Form.Item className={buttonStyles}>
                            <Button
                                type='link'
                                block
                                size='large'
                                icon={<PlusOutlined />}
                                onClick={() => add()}
                            >
                                Добавить ещё
                            </Button>
                            {editTraining && (
                                <Button
                                    type='link'
                                    block
                                    size='large'
                                    className='drawer-button-remove'
                                    icon={<MinusOutlined />}
                                    onClick={() => removeFieldsForm(remove)}
                                    disabled={removeFieldsKey.length === 0}
                                >
                                    Удалить
                                </Button>
                            )}
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};
