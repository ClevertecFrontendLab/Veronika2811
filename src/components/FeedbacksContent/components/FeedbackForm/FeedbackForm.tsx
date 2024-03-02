import { useEffect, useState } from 'react';
import { Form, Input, Rate } from 'antd';

import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';
import { characterRender } from '@components/FeedbacksContent/utils/characterRateRender';

import { useAddFeedbackMutation } from '@redux/api/feedbacks.api';
import { setIsLoading } from '@redux/slice/authSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacksConstants';

import styles from './FeedbackForm.module.scss';

export type FeedbackFormValues = {
    rating: number;
    message: string;
};

type FeedbackFormProps = FeedbacksRefetch & {
    toggleModalVisibility: () => void;
    setIsModalResult: React.Dispatch<React.SetStateAction<string>>;
    changeDisabledButton: (state: boolean) => void;
};

export const FeedbackForm = ({
    refetch,
    toggleModalVisibility,
    setIsModalResult,
    changeDisabledButton,
}: FeedbackFormProps) => {
    const [form] = Form.useForm<FeedbackFormValues>();

    const [addFeedback, { isLoading }] = useAddFeedbackMutation();

    const dispatch = useAppDispatch();

    const [valueRate, setValueRate] = useState(0);

    const onFinish = async (values: FeedbackFormValues) => {
        try {
            await addFeedback(values).unwrap();
            refetch();
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
        changeDisabledButton(value > 0 ? false : true);
    };

    return (
        <Form
            form={form}
            name='review-form'
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError
            className={styles['feedback-form']}
            preserve={false}
        >
            <Form.Item name='rating'>
                <Rate
                    value={valueRate}
                    onChange={(value: number) => changeRateValue(value)}
                    character={({ index, value }) => characterRender(index, value)}
                />
            </Form.Item>
            <Form.Item name='message'>
                <Input.TextArea autoSize />
            </Form.Item>
        </Form>
    );
};
