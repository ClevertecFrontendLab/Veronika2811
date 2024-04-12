import { FC, useEffect, useState } from 'react';
import { characterRender } from '@components/feedbacks-content/utils/character-rate-render';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacks-constants';
import { useAppDispatch } from '@hooks/redux-hooks';
import { useAddFeedbackMutation, useLazyGetFeedbacksQuery } from '@redux/api/feedbacks.api';
import { setIsLoading } from '@redux/slice/main-slice';
import { Form, Input, Rate } from 'antd';

import styles from './feedback-form.module.less';

export type FeedbackFormValues = {
    rating: number;
    message: string;
};

type FeedbackFormProps = {
    toggleModalVisibility: () => void;
    setIsModalResult: React.Dispatch<React.SetStateAction<string>>;
    changeDisabledButton: (state: boolean) => void;
};

export const FeedbackForm: FC<FeedbackFormProps> = ({
    toggleModalVisibility,
    setIsModalResult,
    changeDisabledButton,
}) => {
    const [fetchFeedbacks] = useLazyGetFeedbacksQuery();

    const [form] = Form.useForm<FeedbackFormValues>();

    const [addFeedback, { isLoading }] = useAddFeedbackMutation();

    const dispatch = useAppDispatch();

    const [valueRate, setValueRate] = useState(0);

    const onFinish = async (values: FeedbackFormValues) => {
        try {
            await addFeedback(values).unwrap();
            fetchFeedbacks();
            setIsModalResult(FeedbacksStatus.STATUS_SUCCESS);
            form.resetFields();
        } catch (err: unknown) {
            setIsModalResult(FeedbacksStatus.STATUS_ERROR);
        }
        toggleModalVisibility();
    };

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [dispatch, isLoading]);

    const changeRateValue = (value: number) => {
        setValueRate(value);
        changeDisabledButton(!(value > 0));
    };

    return (
        <Form
            form={form}
            name='review-form'
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError={true}
            className={styles['feedback-form']}
            preserve={false}
        >
            <Form.Item name='rating'>
                <Rate
                    value={valueRate}
                    onChange={(value: number) => changeRateValue(value)}
                    character={({ index, value }) => characterRender(index, value)}
                    allowClear={false}
                />
            </Form.Item>
            <Form.Item name='message'>
                <Input.TextArea autoSize={true} />
            </Form.Item>
        </Form>
    );
};
