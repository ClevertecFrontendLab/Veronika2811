import { useEffect } from 'react';
import { Form, Input, Rate } from 'antd';

import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';

import { useAddFeedbackMutation } from '@redux/api/feedbacks.api';
import { setIsLoading } from '@redux/slice/authSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacksConstants';
import { ratingValidationRules } from '@components/FeedbacksContent/utils/ratingValidationRules';

import styles from './FeedbackForm.module.scss';

type FeedbackFormValues = {
    rating: number;
    message: string;
};

type FeedbackFormProps = FeedbacksRefetch & {
    toggleModalVisibility: () => void;
    setIsModalResult: React.Dispatch<React.SetStateAction<string>>;
};

export const FeedbackForm = ({
    refetch,
    toggleModalVisibility,
    setIsModalResult,
}: FeedbackFormProps) => {
    const [form] = Form.useForm();

    const [addFeedback, { isLoading }] = useAddFeedbackMutation();

    const dispatch = useAppDispatch();

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

    return (
        <>
            <Form
                form={form}
                name='review-form'
                onFinish={onFinish}
                autoComplete='off'
                scrollToFirstError
                className={styles['feedback-form']}
                preserve={false}
            >
                <Form.Item name='rating' rules={ratingValidationRules}>
                    <Rate />
                </Form.Item>
                <Form.Item name='message'>
                    <Input.TextArea autoSize />
                </Form.Item>
            </Form>
        </>
    );
};
