import React, { FC, useCallback, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { trainingSelector, workoutsSelector } from '@redux/selectors';
import { Button, Form, Input, InputNumber, Space } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import classNames from 'classnames';

import styles from './exercises-list.module.less';

type RemoveListAntd = (index: number[] | number) => void;

export const ExercisesList: FC<{ workout?: boolean }> = ({ workout }) => {
    const { isXs } = useBreakpoints();

    const { editTraining } = useAppSelector(trainingSelector);
    const { selectedUser } = useAppSelector(workoutsSelector);

    const [removeFieldsKey, setRemoveFieldsKey] = useState<number[]>([]);

    const buttonStyles = classNames({
        [styles['drawer-buttons']]: editTraining || selectedUser,
        [styles['drawer-button-only']]: !editTraining || !selectedUser,
    });

    const updateRemoveFieldsKey = useCallback(
        (e: CheckboxChangeEvent, index: number) => {
            if (e.target.checked) {
                return setRemoveFieldsKey((prev) => [...prev, index]);
            }

            return setRemoveFieldsKey((prev) => prev.filter((prevIndex) => prevIndex !== index));
        },
        [setRemoveFieldsKey],
    );

    const removeFieldsForm = (remove: RemoveListAntd) => {
        remove(removeFieldsKey);
        setRemoveFieldsKey([]);
    };

    return (
        <Form.List name='exercises'>
            {(fields, { add, remove }) => (
                <React.Fragment>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space
                            direction='vertical'
                            key={key}
                            className={styles['exercise-item']}
                            size={isXs ? 2 : 8}
                        >
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                className='exercise-name'
                            >
                                <Input
                                    data-test-id={`${TRAINING_TEST_IDS.modalDrawerInputExercise}${name}`}
                                    placeholder='Упражнение'
                                    size='small'
                                    maxLength={32}
                                    addonAfter={
                                        editTraining || selectedUser ? (
                                            <Checkbox
                                                onChange={(e: CheckboxChangeEvent) =>
                                                    updateRemoveFieldsKey(e, name)
                                                }
                                                data-test-id={`${TRAINING_TEST_IDS.modalDrawerCheckboxExercise}${name}`}
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
                                        data-test-id={`${TRAINING_TEST_IDS.modalDrawerInputApproach}${name}`}
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
                                        data-test-id={`${TRAINING_TEST_IDS.modalDrawerInputWeight}${name}`}
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
                                        data-test-id={`${TRAINING_TEST_IDS.modalDrawerInputQuantity}${name}`}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </Space>
                    ))}
                    <Form.Item className={buttonStyles}>
                        <Button
                            type='link'
                            block={true}
                            size='large'
                            icon={<PlusOutlined />}
                            onClick={() => add()}
                        >
                            {workout && !editTraining && !selectedUser
                                ? 'Добавить ещё упражнение'
                                : 'Добавить ещё'}
                        </Button>
                        {(editTraining || selectedUser) && (
                            <Button
                                type='link'
                                block={true}
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
                </React.Fragment>
            )}
        </Form.List>
    );
};
